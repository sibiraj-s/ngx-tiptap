import { Injector, Type } from '@angular/core';
import {
  Editor, NodeView, NodeViewProps,
  NodeViewRenderer, NodeViewRendererProps, NodeViewRendererOptions, DecorationWithType,
  getRenderedAttributes,
} from '@tiptap/core';
import type { Decoration, DecorationSource } from '@tiptap/pm/view';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';

import { AngularRenderer } from './AngularRenderer';
import { AngularNodeViewComponent } from './node-view.component';
import { getAngularNodeViewSelectionTracker } from './NodeViewSelectionTracker';
import { getTextSelectionAncestorPositions } from './utils/getTextSelectionAncestorPositions';

interface RendererUpdateProps {
  oldNode: ProseMirrorNode;
  oldDecorations: readonly Decoration[];
  oldInnerDecorations: DecorationSource;
  newNode: ProseMirrorNode;
  newDecorations: readonly Decoration[];
  innerDecorations: DecorationSource;
  updateProps: () => void;
}

type AttrProps = Record<string, string>
| ((props: {
  node: ProseMirrorNode;
  HTMLAttributes: Record<string, unknown>;
}) => Record<string, string>);

interface AngularNodeViewRendererOptions extends NodeViewRendererOptions {
  /**
   * @deprecated Read `selectionInside` from the node view inputs instead.
   */
  selectedOnTextSelection?: boolean;
  update?: ((props: RendererUpdateProps) => boolean) | null;
  injector: Injector;
  attrs?: AttrProps;
}

type AngularNodeViewProps = NodeViewProps & {
  /** Whether a text selection is fully inside the node view. */
  selectionInside: boolean;
};

class AngularNodeView extends NodeView<Type<AngularNodeViewComponent>, Editor, AngularNodeViewRendererOptions> {
  declare renderer: AngularRenderer<AngularNodeViewComponent, AngularNodeViewProps>;
  declare contentDOMElement: HTMLElement | null;

  private nodeSelected = false;

  override mount() {
    const injector = this.options.injector as Injector;

    const props: AngularNodeViewProps = {
      editor: this.editor,
      node: this.node,
      decorations: this.decorations as DecorationWithType[],
      innerDecorations: this.innerDecorations,
      view: this.view,
      selected: false,
      selectionInside: false,
      extension: this.extension,
      HTMLAttributes: this.HTMLAttributes,
      getPos: () => this.getPos(),
      updateAttributes: (attributes = {}) => this.updateAttributes(attributes),
      deleteNode: () => this.deleteNode(),
    };

    // create renderer
    this.renderer = new AngularRenderer(this.component, injector, props);

    // Register drag handler
    if (this.extension.config.draggable) {
      this.renderer.elementRef.nativeElement.ondragstart = (e: DragEvent) => {
        this.onDragStart(e);
      };
    }

    if (this.node.isLeaf) {
      this.contentDOMElement = null;
    } else if (this.options.contentDOMElementTag) {
      this.contentDOMElement = document.createElement(this.options.contentDOMElementTag);
    } else {
      this.contentDOMElement = document.createElement(this.node.isInline ? 'span' : 'div');
    }

    if (this.contentDOMElement) {
      this.contentDOMElement.dataset['nodeViewContentAngular'] = '';

      // For some reason the whiteSpace prop is not inherited properly in Chrome and Safari
      // With this fix it seems to work fine
      // See: https://github.com/ueberdosis/tiptap/issues/1197
      this.contentDOMElement.style.whiteSpace = 'inherit';

      // Required for editable node views
      // The content won't be rendered if `editable` is set to `false`
      this.renderer.detectChanges();
    }

    this.appendContendDom();
    getAngularNodeViewSelectionTracker(this.editor).register(this);
    this.updateElementAttributes();
  }

  override get dom() {
    return this.renderer.dom;
  }

  override get contentDOM() {
    if (this.node.isLeaf) {
      return null;
    }

    return this.contentDOMElement;
  }

  private appendContendDom() {
    const contentElement = this.dom.querySelector('[data-node-view-content]');

    if (
      this.contentDOMElement
      && contentElement
      && !contentElement.contains(this.contentDOMElement)
    ) {
      contentElement.appendChild(this.contentDOMElement);
    }
  }

  update(node: ProseMirrorNode, decorations: readonly Decoration[], innerDecorations: DecorationSource): boolean {
    const updateProps = (props: Partial<NodeViewProps>) => {
      this.renderer.updateProps(props);

      if (typeof this.options.attrs === 'function') {
        this.updateElementAttributes();
      }
    };

    if (this.options.update) {
      const oldNode = this.node;
      const oldDecorations = this.decorations;
      const oldInnerDecorations = this.innerDecorations;

      this.node = node;
      this.decorations = decorations;
      this.innerDecorations = innerDecorations;

      return this.options.update({
        oldNode,
        oldDecorations,
        oldInnerDecorations,
        newNode: node,
        newDecorations: decorations,
        innerDecorations: this.innerDecorations,
        updateProps: () => updateProps({
          node,
          decorations: decorations as DecorationWithType[],
          innerDecorations,
        }),
      });
    }

    if (node.type !== this.node.type) {
      return false;
    }

    if (
      node === this.node
      && this.decorations === decorations
      && this.innerDecorations === innerDecorations
    ) {
      return true;
    }

    this.node = node;
    this.decorations = decorations;
    this.innerDecorations = innerDecorations;

    updateProps({
      node,
      decorations: decorations as DecorationWithType[],
      innerDecorations,
    });

    return true;
  }

  /**
   * Select the node.
   * Add the `selected` prop and the `ProseMirror-selectednode` class.
   */
  selectNode() {
    this.nodeSelected = true;
    this.updateSelectedState(true);
  }

  /**
   * Deselect the node.
   * Remove the `selected` prop and the `ProseMirror-selectednode` class.
   */
  deselectNode() {
    this.nodeSelected = false;
    this.updateSelectedState(
      this.options.selectedOnTextSelection === true && this.isTextSelectionInside(),
    );
  }

  setSelectionInside(selectionInside: boolean) {
    const selected = this.nodeSelected || (this.options.selectedOnTextSelection === true && selectionInside);

    this.renderer.updateProps({ selectionInside, selected });
    this.renderer.dom.classList.toggle('ProseMirror-selectednode', selected);
  }

  private updateSelectedState(selected: boolean) {
    this.renderer.updateProps({ selected });
    this.renderer.dom.classList.toggle('ProseMirror-selectednode', selected);
  }

  private isTextSelectionInside() {
    const pos = this.getPos();

    return (
      typeof pos === 'number'
      && getTextSelectionAncestorPositions(this.editor.state.selection).includes(pos)
    );
  }

  destroy() {
    // unregister before destroying, the dom is read from the component
    getAngularNodeViewSelectionTracker(this.editor).unregister(this);
    this.renderer.destroy();
    this.contentDOMElement = null;
  }

  /**
 * Update the attributes of the top-level element that holds the React component.
 * Applying the attributes defined in the `attrs` option.
 */
  updateElementAttributes() {
    if (this.options.attrs) {
      let attrsObj: Record<string, string> = {};

      if (typeof this.options.attrs === 'function') {
        const extensionAttributes = this.editor.extensionManager.attributes;
        const HTMLAttributes = getRenderedAttributes(this.node, extensionAttributes);

        attrsObj = this.options.attrs({ node: this.node, HTMLAttributes });
      } else {
        attrsObj = this.options.attrs;
      }

      this.renderer.updateAttributes(attrsObj);
    }
  }
}

export const AngularNodeViewRenderer = (
  ViewComponent: Type<AngularNodeViewComponent>,
  options: Partial<AngularNodeViewRendererOptions>,
): NodeViewRenderer => {
  return (props: NodeViewRendererProps) => {
    return new AngularNodeView(ViewComponent, props, options);
  };
};
