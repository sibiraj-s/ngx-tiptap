import { ApplicationRef, Component, Injector, OnDestroy } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Editor, Node, mergeAttributes } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

import { AngularNodeViewComponent } from './node-view.component';
import { AngularNodeViewRenderer } from './NodeViewRenderer';
import { TiptapNodeViewContentDirective } from './node-view-content.directive';

let destroyed = 0;

@Component({
  selector: 'tiptap-test-counter',
  template: `
    <span class="count">{{ node().attrs['count'] }}</span>
    <span class="selected">{{ selected() }}</span>
    <button type="button" class="increment" (click)="increment()">+</button>
    <button type="button" class="delete" (click)="deleteNode()()">x</button>
  `,
})
class CounterComponent extends AngularNodeViewComponent implements OnDestroy {
  increment(): void {
    this.updateAttributes()({ count: this.node().attrs['count'] + 1 });
  }

  ngOnDestroy(): void {
    destroyed += 1;
  }
}

@Component({
  selector: 'tiptap-test-editable',
  imports: [TiptapNodeViewContentDirective],
  template: `
    <div class="label">editable</div>
    <span class="selected">{{ selected() }}</span>
    <span class="selection-inside">{{ selectionInside() }}</span>
    <div tiptapNodeViewContent></div>
  `,
})
class EditableComponent extends AngularNodeViewComponent {}

type Options = Parameters<typeof AngularNodeViewRenderer>[1];

const createEditor = (attrs?: Options['attrs'], editableOptions: Partial<Options> = {}) => {
  const injector = TestBed.inject(Injector);

  const Counter = Node.create({
    name: 'counter',
    group: 'block',
    atom: true,
    draggable: true,
    addAttributes: () => ({ count: { default: 0 } }),
    parseHTML: () => [{ tag: 'tiptap-test-counter' }],
    renderHTML: ({ HTMLAttributes }) => ['tiptap-test-counter', mergeAttributes(HTMLAttributes)],
    addNodeView: () => AngularNodeViewRenderer(CounterComponent, { injector, attrs }),
  });

  const Editable = Node.create({
    name: 'editable',
    group: 'block',
    content: 'inline*',
    parseHTML: () => [{ tag: 'tiptap-test-editable' }],
    renderHTML: ({ HTMLAttributes }) => ['tiptap-test-editable', mergeAttributes(HTMLAttributes), 0],
    addNodeView: () => AngularNodeViewRenderer(EditableComponent, { injector, ...editableOptions }),
  });

  return new Editor({
    extensions: [StarterKit, Counter, Editable],
    content: '<p>text</p><tiptap-test-counter count="2"></tiptap-test-counter><tiptap-test-editable>inner text</tiptap-test-editable>',
  });
};

/** render pending angular views attached to the application */
const render = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve);
  });
  TestBed.inject(ApplicationRef).tick();
};

const counterDom = (editor: Editor) => editor.view.dom.querySelector('tiptap-test-counter') as HTMLElement;
const editableDom = (editor: Editor) => editor.view.dom.querySelector('tiptap-test-editable') as HTMLElement;
const transactionListeners = (editor: Editor) =>
  ((editor as unknown as { callbacks: Record<string, unknown[]> }).callbacks['transaction'] ?? []).length;

describe('AngularNodeViewRenderer', () => {
  let editor: Editor;

  beforeEach(() => {
    destroyed = 0;
  });

  afterEach(() => {
    if (!editor.isDestroyed) {
      editor.destroy();
    }
  });

  it('renders the angular component for the node', async () => {
    editor = createEditor();
    await render();

    expect(counterDom(editor).querySelector('.count')?.textContent).toBe('2');
  });

  it('marks draggable nodes for dragging', () => {
    editor = createEditor();

    expect(counterDom(editor).ondragstart).toBeTypeOf('function');
  });

  it('updates the component when attributes are updated', async () => {
    editor = createEditor();
    await render();

    (counterDom(editor).querySelector('.increment') as HTMLElement).click();
    await render();

    expect(counterDom(editor).querySelector('.count')?.textContent).toBe('3');
    expect(editor.getJSON().content?.[1].attrs).toEqual({ count: 3 });
  });

  it('deletes the node from the component', async () => {
    editor = createEditor();
    await render();

    (counterDom(editor).querySelector('.delete') as HTMLElement).click();
    await render();

    expect(editor.view.dom.querySelector('tiptap-test-counter')).toBeNull();
    expect(destroyed).toBe(1);
  });

  it('selects and deselects the node', async () => {
    editor = createEditor();
    await render();

    const pos = editor.state.doc.child(0).nodeSize;
    editor.commands.setNodeSelection(pos);
    await render();

    expect(counterDom(editor).classList).toContain('ProseMirror-selectednode');
    expect(counterDom(editor).querySelector('.selected')?.textContent).toBe('true');

    editor.commands.setTextSelection(1);
    await render();

    expect(counterDom(editor).classList).not.toContain('ProseMirror-selectednode');
    expect(counterDom(editor).querySelector('.selected')?.textContent).toBe('false');
  });

  it('does not select the node for a text selection across it', async () => {
    editor = createEditor();
    await render();

    editor.commands.setTextSelection({ from: 1, to: editor.state.doc.content.size });
    await render();

    expect(counterDom(editor).classList).not.toContain('ProseMirror-selectednode');
    expect(counterDom(editor).querySelector('.selected')?.textContent).toBe('false');
  });

  it('marks a text selection inside the node', async () => {
    editor = createEditor();
    await render();

    // inside the text of the editable node
    editor.commands.setTextSelection(10);
    await render();

    expect(editableDom(editor).querySelector('.selection-inside')?.textContent).toBe('true');
    expect(editableDom(editor).querySelector('.selected')?.textContent).toBe('false');
    expect(editableDom(editor).classList).not.toContain('ProseMirror-selectednode');

    editor.commands.setTextSelection(1);
    await render();

    expect(editableDom(editor).querySelector('.selection-inside')?.textContent).toBe('false');
  });

  it('selects the node on a text selection inside with selectedOnTextSelection', async () => {
    editor = createEditor(undefined, { selectedOnTextSelection: true });
    await render();

    editor.commands.setTextSelection(10);
    await render();

    expect(editableDom(editor).querySelector('.selected')?.textContent).toBe('true');
    expect(editableDom(editor).classList).toContain('ProseMirror-selectednode');

    editor.commands.setTextSelection(1);
    await render();

    expect(editableDom(editor).querySelector('.selected')?.textContent).toBe('false');
    expect(editableDom(editor).classList).not.toContain('ProseMirror-selectednode');
  });

  it('stops tracking the selection when the node views are removed', async () => {
    editor = createEditor();
    await render();

    expect(transactionListeners(editor)).toBeGreaterThan(0);
    const tracked = transactionListeners(editor);

    editor.commands.setContent('<p>text</p>');
    await render();

    expect(transactionListeners(editor)).toBe(tracked - 1);
  });

  it('renders the node content inside the content directive', () => {
    editor = createEditor();

    const editable = editor.view.dom.querySelector('tiptap-test-editable') as HTMLElement;
    const content = editable.querySelector('[data-node-view-content] [data-node-view-content-angular]');

    expect(content?.textContent).toBe('inner text');
  });

  it('applies static attributes to the node view element', () => {
    editor = createEditor({ 'data-test': 'static' });

    expect(counterDom(editor).getAttribute('data-test')).toBe('static');
  });

  it('applies attributes computed from the node', async () => {
    editor = createEditor(({ node }) => ({ 'data-count': String(node.attrs['count']) }));
    await render();

    expect(counterDom(editor).getAttribute('data-count')).toBe('2');

    (counterDom(editor).querySelector('.increment') as HTMLElement).click();
    await render();

    expect(counterDom(editor).getAttribute('data-count')).toBe('3');
  });

  it('destroys the component and its listeners with the editor', () => {
    editor = createEditor();

    expect(transactionListeners(editor)).toBeGreaterThan(0);

    editor.destroy();

    expect(destroyed).toBe(1);
    expect(transactionListeners(editor)).toBe(0);
  });
});
