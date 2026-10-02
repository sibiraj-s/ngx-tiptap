import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { disabled, form, FormField } from '@angular/forms/signals';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

import { TiptapEditorDirective } from './editor.directive';

describe('NgxTiptapDirective: Signal Forms', () => {
  @Component({
    template: '<div tiptap [editor]="editor" [formField]="form.content"></div>',
    imports: [FormField, TiptapEditorDirective],
  })
  class TestComponent {
    readonly editor = new Editor({
      extensions: [StarterKit],
    });

    readonly model = signal({ content: '<p>Hello world!</p>', locked: false });

    readonly form = form(this.model, (path) => {
      disabled(path.content, ({ valueOf }) => valueOf(path.locked));
    });
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  afterEach(() => {
    component.editor.destroy();
  });

  it('should set the editor content from the form value', async () => {
    expect(component.editor.getHTML()).toBe('<p>Hello world!</p>');

    component.form.content().value.set('<p>Hey.</p>');
    await fixture.whenStable();

    expect(component.editor.getHTML()).toBe('<p>Hey.</p>');
  });

  it('should update the form value on editor changes', () => {
    component.editor.commands.setContent('<p>Hey there!</p>');

    expect(component.model().content).toBe('<p>Hey there!</p>');
  });

  it('should mark the field touched on blur', () => {
    expect(component.form.content().touched()).toBe(false);

    component.editor.emit('blur', {
      editor: component.editor,
      event: new FocusEvent('blur'),
      transaction: component.editor.state.tr,
    });

    expect(component.form.content().touched()).toBe(true);
  });

  it('should disable the editor with the field', async () => {
    expect(component.editor.isEditable).toBe(true);

    component.model.update((value) => ({ ...value, locked: true }));
    await fixture.whenStable();

    expect(component.editor.isEditable).toBe(false);

    component.model.update((value) => ({ ...value, locked: false }));
    await fixture.whenStable();

    expect(component.editor.isEditable).toBe(true);
  });
});
