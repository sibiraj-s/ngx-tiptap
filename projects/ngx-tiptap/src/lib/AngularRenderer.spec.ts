import { ApplicationRef, Component, Injector, input } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AngularRenderer } from './AngularRenderer';

@Component({
  selector: 'tiptap-test-greeting',
  template: '<span>Hello {{ name() }}</span>',
})
class GreetingComponent {
  readonly name = input('world');
}

interface GreetingProps {
  name: string;
}

describe('AngularRenderer', () => {
  const create = (props: Partial<GreetingProps> = {}) =>
    new AngularRenderer<GreetingComponent, GreetingProps>(GreetingComponent, TestBed.inject(Injector), props);

  it('renders the component with the given props', () => {
    const renderer = create({ name: 'tiptap' });
    renderer.detectChanges();

    expect(renderer.instance).toBeInstanceOf(GreetingComponent);
    expect(renderer.dom.tagName).toBe('TIPTAP-TEST-GREETING');
    expect(renderer.dom.textContent).toBe('Hello tiptap');
  });

  it('attaches the view to the application', () => {
    const renderer = create();
    TestBed.inject(ApplicationRef).tick();

    expect(renderer.dom.textContent).toBe('Hello world');
  });

  it('updates the props', () => {
    const renderer = create();
    renderer.updateProps({ name: 'angular' });
    renderer.detectChanges();

    expect(renderer.instance.name()).toBe('angular');
    expect(renderer.dom.textContent).toBe('Hello angular');
  });

  it('updates the attributes of the element', () => {
    const renderer = create();
    renderer.updateAttributes({ 'data-id': '1', class: 'greeting' });

    expect(renderer.dom.getAttribute('data-id')).toBe('1');
    expect(renderer.dom.classList).toContain('greeting');
  });

  it('destroys the component and detaches it from the application', () => {
    const renderer = create();
    const appRef = TestBed.inject(ApplicationRef);
    const views = appRef.viewCount;

    renderer.destroy();

    expect(appRef.viewCount).toBe(views - 1);
  });
});
