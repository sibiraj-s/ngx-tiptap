import {
  ApplicationRef, Component, ComponentFactoryResolver, ComponentRef,
  ElementRef, Injector, Input, Type
} from '@angular/core';
import { NodeViewProps } from '@tiptap/core';

@Component({ template: '' })
export class AngularNodeViewComponent implements NodeViewProps {
  @Input() editor!: NodeViewProps['editor'];
  @Input() node!: NodeViewProps['node'];
  @Input() decorations!: NodeViewProps['decorations'];
  @Input() selected!: NodeViewProps['selected'];
  @Input() extension!: NodeViewProps['extension'];
  @Input() getPos!: NodeViewProps['getPos'];
  @Input() updateAttributes!: NodeViewProps['updateAttributes'];
  @Input() deleteNode!: NodeViewProps['deleteNode'];
}

export class AngularRenderer<C extends AngularNodeViewComponent> {
  private applicationRef: ApplicationRef
  private componentRef: ComponentRef<C>

  constructor(component: Type<C>, injector: Injector, props:NodeViewProps) {
    this.applicationRef = injector.get(ApplicationRef);

    const componentFactoryResolver = injector.get(ComponentFactoryResolver);
    const factory = componentFactoryResolver.resolveComponentFactory(component);

    this.componentRef = factory.create(injector, []);

    // set input props to the component
    this.updateProps(props)

    // Attach to the view so that the change detector knows to run
    this.applicationRef.attachView(this.componentRef.hostView);
  }

  get instance(): C {
    return this.componentRef.instance;
  }

  get elementRef(): ElementRef {
    return this.componentRef.injector.get(ElementRef);
  }

  get dom(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  updateProps<T extends NodeViewProps>(props: Partial<T>): void {
    Object.entries(props).forEach(([k, v]) => {
      this.instance[k as keyof NodeViewProps] = v;
    });
  }

  detectChanges(): void {
    this.componentRef.changeDetectorRef.detectChanges();
  }

  destroy(): void {
    this.applicationRef.detachView(this.componentRef.hostView);
  }
}
