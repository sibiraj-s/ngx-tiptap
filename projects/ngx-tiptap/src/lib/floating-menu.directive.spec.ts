import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

import { EditorDirective } from './editor.directive';
import { FloatingMenuDirective } from './floating-menu.directive';

@Component({
  template: `
      <tiptap-editor [editor]="editor"></tiptap-editor>
      <tiptap-floating-menu [editor]="editor">Floater</tiptap-floating-menu>
    `
})
class TestComponent {
  @Input() editor!: Editor
}

describe('FloatingMenuDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        EditorDirective,
        FloatingMenuDirective
      ]
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    const editor = new Editor({
      extensions: [StarterKit]
    });

    component.editor = editor;
    fixture.detectChanges();
  });

  it('should create an instance', async () => {
    const hostEl = fixture.debugElement.query(By.css('tiptap-floating-menu'));
    await fixture.whenStable();
    const directive = new FloatingMenuDirective(hostEl);
    expect(directive).toBeTruthy();
  });
});
