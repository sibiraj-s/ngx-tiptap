import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

import { TiptapEditorDirective } from './editor.directive';

const listeners = (editor: Editor, event: string) =>
  ((editor as unknown as { callbacks: Record<string, unknown[]> }).callbacks[event] ?? []).length;

describe('NgxTiptapDirective: editor provided later', () => {
  @Component({
    template: '<div tiptap [editor]="editor()" [formControl]="control"></div>',
    imports: [ReactiveFormsModule, TiptapEditorDirective],
  })
  class TestComponent {
    readonly editor = signal<Editor | undefined>(undefined);
    readonly control = new FormControl('<p>form value</p>');
  }

  let fixture: ComponentFixture<TestComponent>;
  const element = () => fixture.nativeElement.querySelector('[tiptap]') as HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
  });

  it('does not throw without an editor', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
    expect(element().querySelector('.ProseMirror')).toBeNull();
  });

  it('renders the editor with the form value once provided', () => {
    fixture.detectChanges();

    const editor = new Editor({ extensions: [StarterKit] });
    fixture.componentInstance.editor.set(editor);
    fixture.detectChanges();

    expect(element().querySelector('.ProseMirror')?.textContent).toBe('form value');
    expect(editor.getHTML()).toBe('<p>form value</p>');
  });

  it('applies the disabled state once provided', () => {
    fixture.componentInstance.control.disable();
    fixture.detectChanges();

    const editor = new Editor({ extensions: [StarterKit] });
    fixture.componentInstance.editor.set(editor);
    fixture.detectChanges();

    expect(editor.isEditable).toBe(false);
  });

  it('updates the form from the editor once provided', () => {
    fixture.detectChanges();

    const editor = new Editor({ extensions: [StarterKit] });
    fixture.componentInstance.editor.set(editor);
    fixture.detectChanges();

    editor.commands.setContent('<p>typed</p>', { emitUpdate: true });

    expect(fixture.componentInstance.control.value).toBe('<p>typed</p>');
  });

  it('replaces the editor when it changes', () => {
    const first = new Editor({ extensions: [StarterKit], content: '<p>first</p>' });
    fixture.componentInstance.editor.set(first);
    fixture.detectChanges();

    const second = new Editor({ extensions: [StarterKit] });
    fixture.componentInstance.editor.set(second);
    fixture.detectChanges();

    expect(element().querySelectorAll('.ProseMirror')).toHaveLength(1);
    expect(element().contains(second.view.dom)).toBe(true);
    expect(element().contains(first.view.dom)).toBe(false);

    // the replaced editor no longer updates the form
    first.commands.setContent('<p>from first</p>', { emitUpdate: true });
    expect(fixture.componentInstance.control.value).not.toBe('<p>from first</p>');
    expect(listeners(first, 'blur')).toBe(listeners(new Editor({ extensions: [StarterKit] }), 'blur'));

    second.commands.setContent('<p>from second</p>', { emitUpdate: true });
    expect(fixture.componentInstance.control.value).toBe('<p>from second</p>');
  });

  it('removes the editor when it is unset', () => {
    const editor = new Editor({ extensions: [StarterKit] });
    fixture.componentInstance.editor.set(editor);
    fixture.detectChanges();

    fixture.componentInstance.editor.set(undefined);
    fixture.detectChanges();

    expect(element().querySelector('.ProseMirror')).toBeNull();
  });
});

describe('NgxTiptapDirective: inner content with editor provided later', () => {
  @Component({
    template: '<div tiptap [editor]="editor()"><p>initial content</p></div>',
    imports: [TiptapEditorDirective],
  })
  class TestComponent {
    readonly editor = signal<Editor | undefined>(undefined);
  }

  it('uses the inner HTML as the initial content of the first editor', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const editor = new Editor({ extensions: [StarterKit] });
    fixture.componentInstance.editor.set(editor);
    fixture.detectChanges();

    expect(editor.getText()).toBe('initial content');
    expect(fixture.nativeElement.querySelectorAll('[tiptap] > .ProseMirror')).toHaveLength(1);
  });
});
