import { Component, ElementRef, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

import { TiptapBubbleMenuDirective } from './bubble-menu.directive';
import { TiptapEditorDirective } from './editor.directive';

@Component({
  template: `
    <tiptap-editor [editor]="editor()"></tiptap-editor>
    <tiptap-bubble-menu [editor]="editor()">BubbleMenu</tiptap-bubble-menu>
  `,
  imports: [TiptapEditorDirective, TiptapBubbleMenuDirective],
})
class TestComponent {
  readonly editor = input.required<Editor>();
}

describe('BubbleMenuDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        TestComponent,
        TiptapEditorDirective,
        TiptapBubbleMenuDirective,
      ],
      providers: [
        {
          provide: ElementRef,
          useValue: new ElementRef(document.createElement('div')),
        },
      ],
    });

    await TestBed.compileComponents();

    const editor = new Editor({
      extensions: [StarterKit],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.componentRef.setInput('editor', editor);
    fixture.detectChanges();
  });

  it('should create an instance', async () => {
    await fixture.whenStable();

    const bubbleMenuElement = fixture.debugElement.query(By.directive(TiptapBubbleMenuDirective));
    const directiveInstance = bubbleMenuElement.injector.get(TiptapBubbleMenuDirective);

    expect(bubbleMenuElement.nativeElement.textContent).toBe('BubbleMenu');
    expect(directiveInstance).toBeTruthy();
  });
});
