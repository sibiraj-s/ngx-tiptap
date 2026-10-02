import { Component, OnDestroy, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Editor, JSONContent } from '@tiptap/core';
import { Markdown } from '@tiptap/markdown';
import StarterKit from '@tiptap/starter-kit';

import { TiptapEditorDirective } from './editor.directive';

describe('NgxTiptapDirective: markdown', () => {
  @Component({
    template: '<tiptap-editor [editor]="editor"></tiptap-editor>',
    imports: [TiptapEditorDirective],
  })
  class TestComponent implements OnDestroy {
    readonly value = signal('# Hello, Tiptap!');

    readonly editor = new Editor({
      extensions: [StarterKit, Markdown],
      content: this.value(),
      contentType: 'markdown',
      onUpdate: ({ editor }) => this.value.set(editor.getMarkdown()),
    });

    ngOnDestroy(): void {
      this.editor.destroy();
    }
  }

  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('renders the initial markdown content', () => {
    expect(fixture.nativeElement.querySelector('tiptap-editor .ProseMirror h1')?.textContent).toBe('Hello, Tiptap!');
  });

  it('updates the value as markdown on change', () => {
    const { editor } = fixture.componentInstance;

    editor.commands.setContent('<p>some <strong>bold</strong> text</p>', { emitUpdate: true });
    expect(fixture.componentInstance.value()).toBe('some **bold** text');
  });

  it('sets markdown content later', () => {
    const { editor } = fixture.componentInstance;

    editor.commands.setContent('- one\n- two', { contentType: 'markdown' });
    const items: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('tiptap-editor .ProseMirror ul li');
    expect(Array.from(items, (item) => item.textContent)).toEqual(['one', 'two']);
  });

  it('gets the markdown on demand', () => {
    const { editor } = fixture.componentInstance;

    editor.commands.setContent('<h2>title</h2><p><em>text</em></p>', { emitUpdate: false });
    expect(editor.getMarkdown()).toBe('## title\n\n*text*');
  });
});

describe('NgxTiptapDirective: markdown with forms', () => {
  @Component({
    template: '<tiptap-editor [editor]="editor" outputFormat="json" [formControl]="control"></tiptap-editor>',
    imports: [ReactiveFormsModule, TiptapEditorDirective],
  })
  class TestComponent implements OnDestroy {
    readonly editor = new Editor({ extensions: [StarterKit, Markdown] });
    readonly control = new FormControl<JSONContent | null>(null);

    ngOnDestroy(): void {
      this.editor.destroy();
    }
  }

  it('converts the json value to and from markdown', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const { editor, control } = fixture.componentInstance;

    editor.commands.setContent('<p>some <strong>bold</strong> text</p>', { emitUpdate: true });
    expect(editor.markdown?.serialize(control.value as JSONContent)).toBe('some **bold** text');

    control.setValue(editor.markdown?.parse('# heading') ?? null);
    expect(fixture.nativeElement.querySelector('tiptap-editor .ProseMirror h1')?.textContent).toBe('heading');
  });
});
