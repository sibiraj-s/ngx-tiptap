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
      imports: [TestComponent, TiptapEditorDirective, TiptapBubbleMenuDirective],
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

  it('hides and positions the menu element', () => {
    const element: HTMLElement = fixture.debugElement.query(By.directive(TiptapBubbleMenuDirective)).nativeElement;

    expect(element.style.visibility).toBe('hidden');
    expect(element.style.position).toBe('absolute');
  });

  it('registers the plugin with the default key', () => {
    const editor = fixture.componentInstance.editor();

    expect(editor.state.plugins.some((plugin) => (plugin as unknown as { key: string }).key.startsWith('NgxTiptapBubbleMenu$'))).toBe(true);
  });

  it('unregisters the plugin and removes the element when destroyed', async () => {
    const editor = fixture.componentInstance.editor();
    const element: HTMLElement = fixture.debugElement.query(By.directive(TiptapBubbleMenuDirective)).nativeElement;
    const parent = document.createElement('div');
    parent.appendChild(element);

    fixture.destroy();

    expect(editor.state.plugins.some((plugin) => (plugin as unknown as { key: string }).key.startsWith('NgxTiptapBubbleMenu$'))).toBe(false);

    await new Promise((resolve) => {
      window.requestAnimationFrame(resolve);
    });

    expect(parent.contains(element)).toBe(false);
  });

  it('does not throw when the editor is destroyed first', () => {
    fixture.componentInstance.editor().destroy();

    expect(() => fixture.destroy()).not.toThrow();
  });
});
