import {
  ApplicationRef, ComponentRef, ElementRef, InputSignalWithTransform, ModelSignal,
  Injector, Type, createComponent,
} from '@angular/core';

/** props for the component, signal inputs are set with the value they accept */
export type AngularRendererProps<P> = {
  // the read type is invariant and not needed, only the type the input accepts is used
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof P]: P[K] extends InputSignalWithTransform<any, infer T>
    ? T
    : P[K] extends ModelSignal<infer T> ? T : P[K];
};

export class AngularRenderer<C, P = C> {
  private applicationRef: ApplicationRef;
  private componentRef: ComponentRef<C>;

  constructor(ViewComponent: Type<C>, injector: Injector, props: Partial<AngularRendererProps<P>>) {
    this.applicationRef = injector.get(ApplicationRef);

    this.componentRef = createComponent(ViewComponent, {
      environmentInjector: this.applicationRef.injector,
      elementInjector: injector,
    });

    // set input props to the component
    this.updateProps(props);

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

  updateProps(props: Partial<AngularRendererProps<P>>): void {
    Object.entries(props).forEach(([key, value]) => {
      this.componentRef.setInput(key, value);
    });
  }

  updateAttributes(attributes: Record<string, string>): void {
    Object.keys(attributes).forEach((key) => {
      this.dom.setAttribute(key, attributes[key]);
    });
  }

  detectChanges(): void {
    this.componentRef.changeDetectorRef.detectChanges();
  }

  destroy(): void {
    this.componentRef.destroy();
    this.applicationRef.detachView(this.componentRef.hostView);
  }
}
