import { Component, Injector, OnDestroy, input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Editor, Extension } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

import { AngularWidgetComponent } from './widget.component';
import { AngularWidgetRenderer } from './WidgetRenderer';

let created = 0;
let destroyed = 0;

@Component({
  selector: 'tiptap-test-widget',
  template: '<span class="size">{{ size() }}</span><span class="pos">{{ getPos()() }}</span>',
})
class SizeWidgetComponent extends AngularWidgetComponent implements OnDestroy {
  readonly size = input(0);

  constructor() {
    super();
    created += 1;
  }

  ngOnDestroy(): void {
    destroyed += 1;
  }
}

const createEditor = () => {
  const injector = TestBed.inject(Injector);

  const SizeWidget = Extension.create({
    name: 'sizeWidget',
    addDecorations: () => ({
      create: ({ editor, state }) => {
        const first = state.doc.firstChild;

        if (!first || first.textContent === '') {
          return [];
        }

        return [
          AngularWidgetRenderer(SizeWidgetComponent, {
            editor,
            injector,
            pos: first.nodeSize - 1,
            key: 'size',
            className: 'widget custom',
            props: { size: state.doc.content.size },
          }),
        ];
      },
    }),
  });

  return new Editor({ extensions: [StarterKit, SizeWidget], content: '<p>text</p>' });
};

const flush = () => new Promise((resolve) => {
  setTimeout(resolve);
});

const widgetDom = (editor: Editor) => editor.view.dom.querySelector('tiptap-test-widget') as HTMLElement;

describe('AngularWidgetRenderer', () => {
  let editor: Editor;

  beforeEach(() => {
    created = 0;
    destroyed = 0;
  });

  afterEach(() => {
    if (!editor.isDestroyed) {
      editor.destroy();
    }
  });

  it('renders the component with its props', () => {
    editor = createEditor();

    expect(widgetDom(editor).querySelector('.size')?.textContent).toBe('6');
    expect(widgetDom(editor).querySelector('.pos')?.textContent).toBe('5');
    expect(widgetDom(editor).classList).toContain('widget');
    expect(widgetDom(editor).classList).toContain('custom');
  });

  it('keeps the component and updates its props for the same key', async () => {
    editor = createEditor();

    editor.commands.insertContentAt(1, 'more ');
    await flush();
    TestBed.tick();

    expect(created).toBe(1);
    expect(widgetDom(editor).querySelector('.size')?.textContent).toBe('11');
  });

  it('destroys the component when the widget is removed', () => {
    editor = createEditor();

    editor.commands.clearContent();

    expect(widgetDom(editor)).toBeNull();
    expect(destroyed).toBe(1);
  });

  it('destroys the component with the editor', () => {
    editor = createEditor();

    editor.destroy();

    expect(destroyed).toBe(1);
  });
});
