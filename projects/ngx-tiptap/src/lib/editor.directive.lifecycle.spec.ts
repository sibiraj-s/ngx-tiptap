import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Content, Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

import { TiptapEditorDirective } from './editor.directive';

describe('NgxTiptapDirective: lifecycle', () => {
  @Component({
    template: '@if (show()) { <div tiptap [editor]="editor" [formControl]="control"></div> }',
    imports: [ReactiveFormsModule, TiptapEditorDirective],
  })
  class TestComponent {
    readonly show = signal(true);
    readonly editor = new Editor({ extensions: [StarterKit] });
    readonly control = new FormControl('<p>start</p>');
  }

  const listeners = (editor: Editor, event: string) =>
    ((editor as unknown as { callbacks: Record<string, unknown[]> }).callbacks[event] ?? []).length;

  let fixture: ComponentFixture<TestComponent>;

  const toggle = () => {
    fixture.componentInstance.show.set(false);
    fixture.detectChanges();
    fixture.componentInstance.show.set(true);
    fixture.detectChanges();
  };

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('removes its editor listeners when destroyed', () => {
    const { editor } = fixture.componentInstance;
    const before = ['blur', 'update', 'selectionUpdate'].map((event) => listeners(editor, event));

    toggle();
    toggle();

    expect(['blur', 'update', 'selectionUpdate'].map((event) => listeners(editor, event))).toEqual(before);
  });

  it('renders the editor again when re-created', () => {
    toggle();

    expect(fixture.nativeElement.querySelector('[tiptap] .ProseMirror')?.textContent).toBe('start');
  });

  it('updates the form control once after being re-created', () => {
    toggle();

    const values: unknown[] = [];
    fixture.componentInstance.control.valueChanges.subscribe((value) => values.push(value));
    fixture.componentInstance.editor.commands.setContent('<p>changed</p>', { emitUpdate: true });

    expect(values).toEqual(['<p>changed</p>']);
  });
});

describe('NgxTiptapDirective: options', () => {
  @Component({
    template: `
      <div tiptap [editor]="editor" [outputFormat]="format()" [formControl]="control"></div>
      <span class="bold">{{ editor.isActive('bold') }}</span>
    `,
    imports: [ReactiveFormsModule, TiptapEditorDirective],
  })
  class TestComponent {
    readonly format = signal<'html' | 'json'>('html');
    readonly editor = new Editor({ extensions: [StarterKit] });
    readonly control = new FormControl<Content>(null);
  }

  let fixture: ComponentFixture<TestComponent>;
  let directive: TiptapEditorDirective;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    directive = fixture.debugElement.query(By.directive(TiptapEditorDirective)).injector.get(TiptapEditorDirective);
  });

  it('emits JSON when outputFormat is json', () => {
    fixture.componentInstance.format.set('json');
    fixture.detectChanges();

    fixture.componentInstance.editor.commands.setContent('<p>json</p>', { emitUpdate: true });

    expect(fixture.componentInstance.control.value).toEqual({
      type: 'doc',
      content: [{ type: 'paragraph', content: [{ type: 'text', text: 'json' }] }],
    });
  });

  it('marks the control as touched on blur', () => {
    expect(fixture.componentInstance.control.touched).toBe(false);

    fixture.componentInstance.editor.emit('blur', {
      editor: fixture.componentInstance.editor,
      event: new FocusEvent('blur'),
      transaction: fixture.componentInstance.editor.state.tr,
    });

    expect(fixture.componentInstance.control.touched).toBe(true);
  });

  it('enables the editor again', () => {
    const element: HTMLElement = fixture.nativeElement.querySelector('[tiptap]');

    directive.setDisabledState(true);
    expect(fixture.componentInstance.editor.isEditable).toBe(false);
    expect((element as HTMLElement & { disabled: boolean }).disabled).toBe(true);

    directive.setDisabledState(false);
    expect(fixture.componentInstance.editor.isEditable).toBe(true);
    expect((element as HTMLElement & { disabled: boolean }).disabled).toBe(false);
  });

  it('refreshes an OnPush host when the selection changes', async () => {
    const { editor } = fixture.componentInstance;
    const bold = () => (fixture.nativeElement.querySelector('.bold') as HTMLElement).textContent;

    editor.commands.setContent('<p><strong>bold</strong> plain</p>');
    editor.commands.setTextSelection(2);
    await fixture.whenStable();

    expect(bold()).toBe('true');

    editor.commands.setTextSelection(8);
    await fixture.whenStable();

    expect(bold()).toBe('false');
  });
});

describe('NgxTiptapDirective: inner content', () => {
  @Component({
    template: '<div tiptap [editor]="editor"><p>initial <strong>content</strong></p></div>',
    imports: [TiptapEditorDirective],
  })
  class TestComponent {
    readonly editor = new Editor({ extensions: [StarterKit] });
  }

  it('uses the inner HTML as the initial content', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.editor.getHTML()).toBe('<p>initial <strong>content</strong></p>');
    expect(fixture.nativeElement.querySelectorAll('[tiptap] > .ProseMirror')).toHaveLength(1);
  });
});
