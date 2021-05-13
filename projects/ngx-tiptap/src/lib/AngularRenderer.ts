import {
  ApplicationRef, Component, ComponentFactoryResolver,
  ComponentRef, ElementRef, Injector,
  Input, Type
} from "@angular/core";
import { NodeViewProps } from "@tiptap/core";

@Component({ template: '' })
export class AngularNodeViewComponent {
  @Input() props: NodeViewProps
}

export class AngularRenderer {
  applicationRef: ApplicationRef
  componentRef: ComponentRef<AngularNodeViewComponent>

  constructor(component: Type<AngularNodeViewComponent>, injector: Injector) {
    this.applicationRef = injector.get(ApplicationRef)

    const componentFactoryResolver = injector.get(ComponentFactoryResolver)
    const factory = componentFactoryResolver.resolveComponentFactory(component);

    this.componentRef = factory.create(injector, []);

    // Attach to the view so that the change detector knows to run
    this.applicationRef.attachView(this.componentRef.hostView);
  }

  get instance(): AngularNodeViewComponent {
    return this.componentRef.instance
  }

  get elementRef(): ElementRef {
    return this.componentRef.injector.get(ElementRef)
  }

  get dom(): HTMLElement {
    return this.elementRef.nativeElement
  }

  setProps(props: NodeViewProps): void {
    this.instance.props = props
  }

  updateProps(props: Partial<NodeViewProps>): void {
    this.instance.props = {
      ...this.instance.props,
      ...props
    }
  }

  destroy(): void {
    this.applicationRef.detachView(this.componentRef.hostView)
  }
}
