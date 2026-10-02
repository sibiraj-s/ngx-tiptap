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
      imports: [TestComponent, TiptapEditorDirective, TiptapFloatingMenuDirective],
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

  it('hides and positions the menu element', () => {
    const element: HTMLElement = fixture.debugElement.query(By.directive(TiptapFloatingMenuDirective)).nativeElement;

    expect(element.style.visibility).toBe('hidden');
    expect(element.style.position).toBe('absolute');
  });

  it('registers the plugin with the default key', () => {
    const editor = fixture.componentInstance.editor();

    expect(editor.state.plugins.some((plugin) => (plugin as unknown as { key: string }).key.startsWith('NgxTiptapFloatingMenu$'))).toBe(true);
  });

  it('unregisters the plugin and removes the element when destroyed', async () => {
    const editor = fixture.componentInstance.editor();
    const element: HTMLElement = fixture.debugElement.query(By.directive(TiptapFloatingMenuDirective)).nativeElement;
    const parent = document.createElement('div');
    parent.appendChild(element);

    fixture.destroy();

    expect(editor.state.plugins.some((plugin) => (plugin as unknown as { key: string }).key.startsWith('NgxTiptapFloatingMenu$'))).toBe(false);

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
