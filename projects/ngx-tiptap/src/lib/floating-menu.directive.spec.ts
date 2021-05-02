import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Editor } from '@tiptap/core';
import { defaultExtensions } from '@tiptap/starter-kit';

import { EditorDirective } from './editor.directive';
import { FloatingMenuDirective } from './floating-menu.directive';

@Component({
  template: `
      <tiptap-editor [editor]="editor"></tiptap-editor>
      <tiptap-floting-menu [editor]="editor"></tiptap-floting-menu>
    `
})
class TestComponent {
  @Input() editor: Editor
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

    await TestBed.compileComponents()

    fixture = TestBed.createComponent(TestComponent)
    component = fixture.componentInstance;

    const editor = new Editor({
      extensions: defaultExtensions()
    })

    component.editor = editor
    fixture.detectChanges()
  });

  it('should create an instance', () => {
    const hostEl = fixture.debugElement.query(By.css('tiptap-floting-menu'));
    const directive = new FloatingMenuDirective(hostEl);
    expect(directive).toBeTruthy();
  });

  // it('should render the floating menu', async () => {
  //   const directiveEl = fixture.debugElement.query(By.directive(EditorDirective));
  //   expect(directiveEl.query(By.css('[data-tippy-root]'))).toBeFalsy()

  //   directiveEl.query(By.css('.ProseMirror')).nativeElement.dispatchEvent(new Event('focus'))
  //   fixture.detectChanges()
  //   await fixture.whenStable()
  //   console.log(directiveEl.nativeElement)

  //   expect(directiveEl.query(By.css('[data-tippy-root]'))).toBeTruthy()
  // })
});
