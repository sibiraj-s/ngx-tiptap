import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

import { TiptapBubbleMenuDirective } from './bubble-menu.directive';
import { TiptapEditorDirective } from './editor.directive';

@Component({
  template: `
    <tiptap-editor [editor]="editor"></tiptap-editor>
    <tiptap-bubble-menu [editor]="editor">BubbleMenu</tiptap-bubble-menu>
  `,
  imports: [TiptapEditorDirective, TiptapBubbleMenuDirective],
})
class TestComponent {
  @Input() editor!: Editor;
}

describe('BubbleMenuDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [TestComponent,
        TiptapEditorDirective,
        TiptapBubbleMenuDirective],
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    const editor = new Editor({
      extensions: [StarterKit],
    });

    component.editor = editor;
    fixture.detectChanges();
  });

  it('should create an instance', async () => {
    const hostEl = fixture.debugElement.query(By.css('tiptap-bubble-menu'));
    await fixture.whenStable();
    const directive = new TiptapBubbleMenuDirective(hostEl);
    expect(directive).toBeTruthy();
  });
});
