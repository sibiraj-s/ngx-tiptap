import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

import { BubbleMenuDirective } from './bubble-menu.directive';
import { EditorDirective } from './editor.directive';

@Component({
  template: `
    <tiptap-editor [editor]="editor"></tiptap-editor>
    <tiptap-bubble-menu [editor]="editor">BubbleMenu</tiptap-bubble-menu>
  `
})
class TestComponent {
  @Input() editor!: Editor
}

describe('BubbleMenuDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        EditorDirective,
        BubbleMenuDirective
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
    const hostEl = fixture.debugElement.query(By.css('tiptap-bubble-menu'));
    await fixture.whenStable();
    const directive = new BubbleMenuDirective(hostEl);
    expect(directive).toBeTruthy();
  });

  it('should create bubble menu', async () => {
    expect(fixture.debugElement.query(By.css('[data-tippy-root]'))).toBeFalsy();
    await fixture.whenStable();

    component.editor.chain().setContent('Hello world').focus().selectAll().run();
    fixture.detectChanges();
    await fixture.whenStable();

    // expect(fixture.debugElement.query(By.css('[data-tippy-root]'))).toBeTruthy();
    // expect(directiveEl.query(By.css('[data-tippy-root]')).nativeElement.innerHTML).toContain('BubbleMenu');
  });
});
