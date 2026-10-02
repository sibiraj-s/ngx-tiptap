import { ApplicationRef, Component, Injector, input, model } from '@angular/core';
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

@Component({
  selector: 'tiptap-test-suggestions',
  template: '{{ props()["query"] }} {{ count() }} {{ selected() }}',
})
class SuggestionsComponent {
  readonly props = input<Record<string, unknown>>({});
  readonly count = input.required<number>();
  readonly selected = model(false);
  readonly label = input('', { transform: (value: number) => String(value) });
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

describe('AngularRenderer: component as props type', () => {
  it('accepts the values of signal inputs', () => {
    // issue #101: signal inputs are typed as the value they accept, not the signal
    const renderer = new AngularRenderer<SuggestionsComponent, SuggestionsComponent>(
      SuggestionsComponent,
      TestBed.inject(Injector),
      { count: 1 },
    );

    renderer.updateProps({ props: { query: 'emoji' }, count: 2, selected: true, label: 3 });
    renderer.detectChanges();

    expect(renderer.instance.props()).toEqual({ query: 'emoji' });
    expect(renderer.instance.label()).toBe('3');
    expect(renderer.dom.textContent).toBe('emoji 2 true');
  });

  it('infers the props type from the component', () => {
    const renderer = new AngularRenderer(SuggestionsComponent, TestBed.inject(Injector), { count: 1 });

    renderer.updateProps({ count: 5 });
    renderer.detectChanges();

    expect(renderer.instance.count()).toBe(5);
  });

  it('rejects values of the wrong type', () => {
    const renderer = new AngularRenderer(SuggestionsComponent, TestBed.inject(Injector), { count: 1 });

    // @ts-expect-error count accepts a number
    expect(() => renderer.updateProps({ count: 'five' })).not.toThrow();
  });
});
