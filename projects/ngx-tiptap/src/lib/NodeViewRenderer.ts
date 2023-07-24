import { Injector, Type } from '@angular/core';
import {
  Editor, NodeView, NodeViewProps,
  NodeViewRenderer, NodeViewRendererProps, NodeViewRendererOptions, DecorationWithType,
} from '@tiptap/core';
import type { Decoration } from '@tiptap/pm/view';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';

import { AngularRenderer } from './AngularRenderer';
import { AngularNodeViewComponent } from './node-view.component';

interface RendererUpdateProps {
  oldNode: ProseMirrorNode;
  oldDecorations: Decoration[];
  newNode: ProseMirrorNode;
  newDecorations: Decoration[];
  updateProps: () => void;
}

interface AngularNodeViewRendererOptions extends NodeViewRendererOptions {
  update?: ((props: RendererUpdateProps) => boolean) | null;
  injector: Injector;
}

class AngularNodeView extends NodeView<Type<AngularNodeViewComponent>, Editor, AngularNodeViewRendererOptions> {
  renderer!: AngularRenderer<AngularNodeViewComponent, NodeViewProps>;
  contentDOMElement!: HTMLElement | null;

  override mount() {
    const injector = this.options.injector as Injector;

    const props: NodeViewProps = {
      editor: this.editor,
      node: this.node,
      decorations: this.decorations,
      selected: false,
      extension: this.extension,
      getPos: () => this.getPos(),
      updateAttributes: (attributes = {}) => this.updateAttributes(attributes),
      deleteNode: () => this.deleteNode(),
    };

    this.handleSelectionUpdate = this.handleSelectionUpdate.bind(this);
    this.editor.on('selectionUpdate', this.handleSelectionUpdate);

    // create renderer
    this.renderer = new AngularRenderer(this.component, injector, props);

    // Register drag handler
    if (this.extension.config.draggable) {
      this.renderer.elementRef.nativeElement.ondragstart = (e: DragEvent) => {
        this.onDragStart(e);
      };
    }

    this.contentDOMElement = this.node.isLeaf ? null : document.createElement(this.node.isInline ? 'span' : 'div');

    if (this.contentDOMElement) {
      // For some reason the whiteSpace prop is not inherited properly in Chrome and Safari
      // With this fix it seems to work fine
      // See: https://github.com/ueberdosis/tiptap/issues/1197
      this.contentDOMElement.style.whiteSpace = 'inherit';

      // Required for editable node views
      // The content won't be rendered if `editable` is set to `false`
      this.renderer.detectChanges();
    }

    this.appendContendDom();
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

  handleSelectionUpdate() {
    const { from, to } = this.editor.state.selection;

    if (from <= this.getPos() && to >= this.getPos() + this.node.nodeSize) {
      this.selectNode();
    } else {
      this.deselectNode();
    }
  }

  update(node: ProseMirrorNode, decorations: DecorationWithType[]): boolean {
    const updateProps = () => {
      this.renderer.updateProps({ node, decorations });
    };

    if (this.options.update) {
      const oldNode = this.node;
      const oldDecorations = this.decorations;

      this.node = node;
      this.decorations = decorations;

      return this.options.update({
        oldNode,
        oldDecorations,
        newNode: node,
        newDecorations: decorations,
        updateProps: () => updateProps(),
      });
    }

    if (node.type !== this.node.type) {
      return false;
    }

    if (node === this.node && this.decorations === decorations) {
      return true;
    }

    this.node = node;
    this.decorations = decorations;
    updateProps();

    return true;
  }

  selectNode() {
    this.renderer.updateProps({ selected: true });
  }

  deselectNode() {
    this.renderer.updateProps({ selected: false });
  }

  destroy() {
    this.renderer.destroy();
    this.editor.off('selectionUpdate', this.handleSelectionUpdate);
    this.contentDOMElement = null;
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
