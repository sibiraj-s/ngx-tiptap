import { Editor, Node, type EditorOptions } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

import { handleMobileEnter } from './handleMobileEnter';

// a paragraph rendered like the content of an editable angular node view
const NodeViewParagraph = Node.create({
  name: 'paragraph',
  priority: 1000,
  group: 'block',
  content: 'inline*',
  parseHTML: () => [{ tag: 'p' }],
  renderHTML: () => ['p', 0],
  addNodeView: () => () => {
    const dom = document.createElement('p');

    dom.dataset['nodeViewContentAngular'] = '';

    return {
      dom,
      contentDOM: dom,
      ignoreMutation: (mutation) => mutation.type === 'attributes',
    };
  },
});

describe('handleMobileEnter', () => {
  let editor: Editor;

  // jsdom has no layout, prosemirror reads the caret coordinates to scroll after a DOM change
  beforeAll(() => {
    Range.prototype.getClientRects = () => [] as unknown as DOMRectList;
    Range.prototype.getBoundingClientRect = () => new DOMRect();
  });

  afterAll(() => {
    delete (Range.prototype as Partial<Range>).getClientRects;
    delete (Range.prototype as Partial<Range>).getBoundingClientRect;
  });

  const createEditor = (options: Partial<EditorOptions> = {}) => {
    vi.stubGlobal('navigator', { platform: 'Android', userAgent: 'Android 14' });
    editor = new Editor({
      extensions: [StarterKit.configure({ paragraph: false }), NodeViewParagraph],
      content: '<p>Hello</p>',
      ...options,
    });
    document.body.append(editor.view.dom);
    const contentDOM = editor.view.dom.firstElementChild as HTMLElement;

    editor.commands.setTextSelection(6);
    editor.view.focus();

    return contentDOM;
  };

  const beforeInput = (options: InputEventInit = {}) => {
    const event = new InputEvent('beforeinput', {
      inputType: 'insertParagraph',
      cancelable: true,
      ...options,
    });

    handleMobileEnter(editor, event);
    return event;
  };

  afterEach(() => {
    editor?.destroy();
    document.body.replaceChildren();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  const queueSelectionChange = (contentDOM: HTMLElement) => {
    const view = editor.view as typeof editor.view & {
      domObserver: { flush: () => void; onSelectionChange: () => void };
    };

    view.domObserver.flush();
    // keep the selection change pending until beforeinput
    document.removeEventListener('selectionchange', view.domObserver.onSelectionChange);
    document.getSelection()?.collapse(contentDOM.firstChild as Text, 3);
    view.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13 }));
  };

  it('preserves native Enter detection when no handler accepts it', () => {
    const contentDOM = createEditor({ enableCoreExtensions: { keymap: false } });
    const view = editor.view as typeof editor.view & { input: { lastKeyCode: number | null } };

    queueSelectionChange(contentDOM);

    expect(beforeInput().defaultPrevented).toBe(false);
    expect(view.input.lastKeyCode).toBe(13);
    expect(editor.state.selection.from).toBe(4);
    expect(editor.getHTML()).toBe('<p>Hello</p>');
  });

  it.each([
    ['insertParagraph', '<p>Hello</p><p></p>', 8],
    ['insertLineBreak', '<p>Hello<br></p>', 7],
  ])('handles %s at the caret', (inputType, html, position) => {
    createEditor();

    expect(beforeInput({ inputType }).defaultPrevented).toBe(true);
    expect(editor.getHTML()).toBe(html);
    expect(editor.state.selection.from).toBe(position);
  });

  it('commits pending DOM text and selection before splitting', () => {
    const contentDOM = createEditor();
    const text = contentDOM.firstChild as Text;

    text.textContent = 'Hello world';
    document.getSelection()?.collapse(text, 11);

    expect(beforeInput().defaultPrevented).toBe(true);
    expect(editor.getHTML()).toBe('<p>Hello world</p><p></p>');
    expect(editor.state.selection.from).toBe(14);
  });

  it.each([
    ['insertParagraph', false],
    ['insertLineBreak', true],
  ])('uses custom keyboard handlers for %s', (inputType, shiftKey) => {
    const handleKeyDown = vi.fn(() => true);

    createEditor({ editorProps: { handleKeyDown } });

    expect(beforeInput({ inputType }).defaultPrevented).toBe(true);
    expect(handleKeyDown).toHaveBeenCalledWith(
      editor.view,
      expect.objectContaining({ key: 'Enter', keyCode: 13, shiftKey }),
    );
    expect(editor.getHTML()).toBe('<p>Hello</p>');
  });

  it('allows native input when no keyboard handler accepts Enter', () => {
    createEditor({ enableCoreExtensions: { keymap: false } });

    expect(beforeInput().defaultPrevented).toBe(false);
    expect(editor.getHTML()).toBe('<p>Hello</p>');
  });

  it.each([{ cancelable: false }, { inputType: 'insertText' }])(
    'leaves unrelated or noncancelable input alone: %j',
    (options) => {
      createEditor();

      expect(beforeInput(options).defaultPrevented).toBe(false);
      expect(editor.getHTML()).toBe('<p>Hello</p>');
    },
  );

  it('respects an already handled event', () => {
    createEditor();
    const event = new InputEvent('beforeinput', { inputType: 'insertParagraph', cancelable: true });

    event.preventDefault();
    handleMobileEnter(editor, event);

    expect(editor.getHTML()).toBe('<p>Hello</p>');
  });

  it('leaves desktop input alone', () => {
    createEditor();
    vi.stubGlobal('navigator', { platform: 'Linux', userAgent: 'Linux' });

    expect(beforeInput().defaultPrevented).toBe(false);
    expect(editor.getHTML()).toBe('<p>Hello</p>');
  });

  it('leaves ordinary paragraphs alone', () => {
    const contentDOM = createEditor();

    delete contentDOM.dataset['nodeViewContentAngular'];

    expect(beforeInput().defaultPrevented).toBe(false);
    expect(editor.getHTML()).toBe('<p>Hello</p>');
  });

  it('leaves read-only editors alone', () => {
    createEditor();
    editor.setEditable(false);

    expect(beforeInput().defaultPrevented).toBe(false);
    expect(editor.getHTML()).toBe('<p>Hello</p>');
  });
});
