import {
  ApplicationRef, Component, ComponentFactoryResolver, ComponentRef,
  ElementRef, Injector, Input, Type
} from "@angular/core";
import { Editor, NodeView, NodeViewRenderer, NodeViewRendererProps } from "@tiptap/core";

type Attributes = Record<string, unknown>

@Component({ template: '' })
export class AngularNodeViewComponent {
  @Input() attributes: Attributes
  @Input() updateAttributes: (attrs: Attributes) => void
}

class AngularNodeView extends NodeView<Type<AngularNodeViewComponent>, Editor> {
  renderer: ElementRef<HTMLElement>
  componentRef: ComponentRef<AngularNodeViewComponent>
  applicationRef: ApplicationRef

  mount() {
    const injector = (this.options as any).injector as Injector
    this.applicationRef = injector.get(ApplicationRef)

    const componentFactoryResolver = injector.get(ComponentFactoryResolver)
    const factory = componentFactoryResolver.resolveComponentFactory(this.component);

    this.componentRef = factory.create(injector, []);

    // Attach to the view so that the change detector knows to run
    this.applicationRef.attachView(this.componentRef.hostView);

    // Pass input props to the component
    this.componentRef.instance.attributes = this.node.attrs
    this.componentRef.instance.updateAttributes = (attrs: Attributes) => {
      this.updateAttrs(attrs)
    }

    this.renderer = this.componentRef.injector.get(ElementRef)
  }

  get dom() {
    return this.renderer.nativeElement
  }

  private updateAttrs = (attrs: Attributes) => {
    this.updateAttributes({
      ...this.node.attrs,
      ...attrs
    })

    this.componentRef.instance.attributes = this.node.attrs
  }

  selectNode() {
    this.updateAttrs({ selected: true })
  }

  deselectNode() {
    this.updateAttrs({ selected: false })
  }

  destroy() {
    this.applicationRef.detachView(this.componentRef.hostView);
  }
}

export const AngularNodeViewRenderer = (component: Type<AngularNodeViewComponent>, injector: Injector): NodeViewRenderer => {
  return (props: NodeViewRendererProps) => {
    return new AngularNodeView(component, props, ({ injector } as any))
  }
}
