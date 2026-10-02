import { ApplicationRef, Component, Injector, OnDestroy } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Editor, Mark, mergeAttributes } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

import { AngularMarkViewComponent } from './mark-view.component';
import { AngularMarkViewRenderer, AngularMarkViewRendererOptions } from './MarkViewRenderer';
import { TiptapMarkViewContentDirective } from './mark-view-content.directive';

let destroyed = 0;

@Component({
  selector: 'tiptap-test-highlight',
  imports: [TiptapMarkViewContentDirective],
  template: `
    <span class="color">{{ mark().attrs['color'] }}</span>
    <button type="button" class="change" (click)="updateAttributes()({ color: 'red' })">red</button>
    <span tiptapMarkViewContent></span>
  `,
})
class HighlightComponent extends AngularMarkViewComponent implements OnDestroy {
  ngOnDestroy(): void {
    destroyed += 1;
  }
}

const createEditor = (options: Partial<AngularMarkViewRendererOptions> = {}) => {
  const injector = TestBed.inject(Injector);

  const Highlight = Mark.create({
    name: 'highlight',
    addAttributes: () => ({ color: { default: 'yellow' } }),
    parseHTML: () => [{ tag: 'mark' }],
    renderHTML: ({ HTMLAttributes }) => ['mark', mergeAttributes(HTMLAttributes), 0],
    addMarkView: () => AngularMarkViewRenderer(HighlightComponent, { injector, ...options }),
  });

  return new Editor({
    extensions: [StarterKit, Highlight],
    content: '<p>plain <mark color="green">marked</mark></p>',
  });
};

/** render pending angular views attached to the application */
const render = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve);
  });
  TestBed.inject(ApplicationRef).tick();
};

const markDom = (editor: Editor) => editor.view.dom.querySelector('tiptap-test-highlight') as HTMLElement;

describe('AngularMarkViewRenderer', () => {
  let editor: Editor;

  beforeEach(() => {
    destroyed = 0;
  });

  afterEach(() => {
    if (!editor.isDestroyed) {
      editor.destroy();
    }
  });

  it('renders the angular component for the mark', async () => {
    editor = createEditor();
    await render();

    expect(markDom(editor).classList).toContain('mark-highlight');
    expect(markDom(editor).querySelector('.color')?.textContent).toBe('green');
  });

  it('renders the mark content inside the content directive', () => {
    editor = createEditor();

    const content = markDom(editor).querySelector('[data-mark-view-content] > span');

    expect(content?.textContent).toBe('marked');
    expect(editor.getHTML()).toBe('<p>plain <mark color="green">marked</mark></p>');
  });

  it('applies the class name and attributes options', () => {
    editor = createEditor({ className: 'custom another', attrs: { 'data-test': 'static' } });

    expect(markDom(editor).classList).toContain('mark-highlight');
    expect(markDom(editor).classList).toContain('custom');
    expect(markDom(editor).classList).toContain('another');
    expect(markDom(editor).getAttribute('data-test')).toBe('static');
  });

  it('updates the mark attributes from the component', async () => {
    editor = createEditor();
    await render();

    (markDom(editor).querySelector('.change') as HTMLElement).click();
    await render();

    expect(editor.getHTML()).toBe('<p>plain <mark color="red">marked</mark></p>');
    expect(markDom(editor).querySelector('.color')?.textContent).toBe('red');
  });

  it('destroys the component when the mark is removed', async () => {
    editor = createEditor();
    await render();

    editor.chain().selectAll().unsetMark('highlight').run();
    await render();

    expect(markDom(editor)).toBeNull();
    expect(destroyed).toBe(1);
  });

  it('destroys the component with the editor', () => {
    editor = createEditor();

    editor.destroy();

    expect(destroyed).toBe(1);
  });
});
