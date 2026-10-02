import { Injector, Type } from '@angular/core';
import {
  MarkView, MarkViewProps, MarkViewRenderer, MarkViewRendererOptions,
} from '@tiptap/core';

import { AngularRenderer } from './AngularRenderer';
import { AngularMarkViewComponent } from './mark-view.component';

export interface AngularMarkViewRendererOptions extends MarkViewRendererOptions {
  injector: Injector;
  className?: string;
  attrs?: Record<string, string>;
}

export class AngularMarkView extends MarkView<Type<AngularMarkViewComponent>, AngularMarkViewRendererOptions> {
  renderer: AngularRenderer<AngularMarkViewComponent>;
  contentDOMElement: HTMLElement;

  constructor(
    component: Type<AngularMarkViewComponent>,
    props: MarkViewProps,
    options?: Partial<AngularMarkViewRendererOptions>,
  ) {
    super(component, props, options);

    const { injector, attrs, className = '' } = this.options;

    const componentProps: MarkViewProps = {
      ...props,
      updateAttributes: this.updateAttributes.bind(this),
    };

    this.contentDOMElement = document.createElement('span');

    this.renderer = new AngularRenderer(component, injector as Injector, componentProps);

    `mark-${props.mark.type.name} ${className}`.trim().split(/\s+/).forEach((name) => {
      this.renderer.dom.classList.add(name);
    });

    if (attrs) {
      this.renderer.updateAttributes(attrs);
    }

    // render the component, so the content element is available
    this.renderer.detectChanges();
    this.appendContentDom();
  }

  override get dom() {
    return this.renderer.dom;
  }

  override get contentDOM() {
    return this.contentDOMElement;
  }

  private appendContentDom() {
    const contentElement = this.dom.querySelector('[data-mark-view-content]');

    if (contentElement && !contentElement.contains(this.contentDOMElement)) {
      contentElement.appendChild(this.contentDOMElement);
    }
  }

  destroy() {
    this.renderer.destroy();
  }
}

export const AngularMarkViewRenderer = (
  component: Type<AngularMarkViewComponent>,
  options: Partial<AngularMarkViewRendererOptions> = {},
): MarkViewRenderer => {
  return (props) => new AngularMarkView(component, props, options);
};
