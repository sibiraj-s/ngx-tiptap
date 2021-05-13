import { Injector, Type } from "@angular/core";
import { Editor, NodeView, NodeViewProps, NodeViewRenderer, NodeViewRendererProps } from "@tiptap/core";
import { Decoration, NodeView as ProseMirrorNodeView } from 'prosemirror-view'
import { Node as ProseMirrorNode } from 'prosemirror-model'
import { AngularNodeViewComponent, AngularRenderer } from "./AngularRenderer";

interface AngularNodeViewRendererOptions {
  stopEvent?: ((event: Event) => boolean) | null,
  update?: ((node: ProseMirrorNode, decorations: Decoration[]) => boolean) | null,
  injector: Injector
}

class AngularNodeView extends NodeView<Type<AngularNodeViewComponent>, Editor> implements ProseMirrorNodeView {
  renderer: AngularRenderer
  contentDOMElement: HTMLElement | null

  mount() {
    const injector = (this.options as AngularNodeViewRendererOptions).injector as Injector

    this.renderer = new AngularRenderer(this.component, injector)

    const props: NodeViewProps = {
      editor: this.editor,
      node: this.node,
      decorations: this.decorations,
      selected: false,
      extension: this.extension,
      getPos: () => this.getPos(),
      updateAttributes: (attributes = {}) => this.updateAttributes(attributes),
    }

    // Pass input props to the component
    this.renderer.instance.props = props
    this.renderer.updateProps(props)

    if (this.extension.config.draggable) {
      // Register drag handler
      this.renderer.elementRef.nativeElement.ondragstart = (e: DragEvent) => {
        this.onDragStart(e)
      }
    }

    this.contentDOMElement = this.node.isLeaf ? null : document.createElement(this.node.isInline ? 'span' : 'div')

    if (this.contentDOMElement) {
      // For some reason the whiteSpace prop is not inherited properly in Chrome and Safari
      // With this fix it seems to work fine
      // See: https://github.com/ueberdosis/tiptap/issues/1197
      this.contentDOMElement.style.whiteSpace = 'inherit'
    }

    // attach stopEvent
    if (this.options.stopEvent) {
      this.stopEvent = this.options.stopEvent
    }
  }

  get dom() {
    return this.renderer.dom
  }

  get contentDOM() {
    if (this.node.isLeaf) {
      return null
    }

    const contentElement = this.dom.querySelector('[data-node-view-content]')

    if (
      this.contentDOMElement
      && contentElement
      && !contentElement.contains(this.contentDOMElement)
    ) {
      contentElement.appendChild(this.contentDOMElement)
    }

    return this.contentDOMElement
  }

  update(node: ProseMirrorNode, decorations: Decoration[]): boolean {
    if (this.options.update) {
      return this.options.update(node, decorations)
    }

    if (node.type !== this.node.type) {
      return false
    }

    if (node === this.node && this.decorations === decorations) {
      return true
    }

    this.node = node
    this.decorations = decorations
    this.renderer.updateProps({ node, decorations })

    return true
  }

  selectNode() {
    this.renderer.updateProps({ selected: true })
  }

  deselectNode() {
    this.renderer.updateProps({ selected: false })
  }

  destroy() {
    this.renderer.destroy();
  }
}

export const AngularNodeViewRenderer = (component: Type<AngularNodeViewComponent>, options: AngularNodeViewRendererOptions): NodeViewRenderer => {
  return (props: NodeViewRendererProps) => {
    return new AngularNodeView(component, props, options) as ProseMirrorNodeView
  }
}
