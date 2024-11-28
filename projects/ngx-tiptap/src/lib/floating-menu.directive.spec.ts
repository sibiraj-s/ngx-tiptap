import { Component, ElementRef, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

import { TiptapEditorDirective } from './editor.directive';
import { TiptapFloatingMenuDirective } from './floating-menu.directive';

@Component({
  template: `
    <tiptap-editor [editor]="editor()"></tiptap-editor>
    <tiptap-floating-menu [editor]="editor()">Floater</tiptap-floating-menu>
  `,
  imports: [TiptapEditorDirective, TiptapFloatingMenuDirective],
})
class TestComponent {
  readonly editor = input.required<Editor>();
}

describe('FloatingMenuDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        TestComponent,
        TiptapEditorDirective,
        TiptapFloatingMenuDirective,
      ],
      providers: [
        {
          provide: ElementRef,
          useValue: new ElementRef(document.createElement('div')),
        },
      ],
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(TestComponent);

    const editor = new Editor({
      extensions: [StarterKit],
    });

    fixture.componentRef.setInput('editor', editor);

    fixture.detectChanges();
  });

  it('should create an instance', async () => {
    await fixture.whenStable();

    const floatingMenuElement = fixture.debugElement.query(By.directive(TiptapFloatingMenuDirective));
    const directiveInstance = floatingMenuElement.injector.get(TiptapFloatingMenuDirective);

    expect(floatingMenuElement.nativeElement.textContent).toBe('Floater');
    expect(directiveInstance).toBeTruthy();
  });
});
