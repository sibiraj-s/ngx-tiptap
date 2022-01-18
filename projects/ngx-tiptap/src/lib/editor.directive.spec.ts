import { Component, DebugElement, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Content, Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

import { EditorDirective } from './editor.directive';

describe('NgxTiptapDirective', () => {
  @Component({
    template: '<div tiptap [editor]="editor"></div>'
  })
  class TestComponent {
    editor!: Editor
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        EditorDirective
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

  it('should create an instance', () => {
    const hostEl = fixture.debugElement.query(By.css('div'));
    const renderer = fixture.debugElement.injector.get(Renderer2);

    const directive = new EditorDirective(hostEl, renderer);
    expect(directive).toBeTruthy();
  });
});

@Component({
  template: '<div tiptap [editor]="editor" [(ngModel)]="value"></div>'
})
class TestFormComponent {
  editor!: Editor
  value: Content = 'Default Text'
}

describe('NgxTiptapDirective: FormsModule', () => {
  let component: TestFormComponent;
  let fixture: ComponentFixture<TestFormComponent>;
  let directiveEl: DebugElement;
  let directiveInstance: EditorDirective;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        TestFormComponent,
        EditorDirective
      ],
      imports: [
        FormsModule,
      ],
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(TestFormComponent);
    component = fixture.componentInstance;

    const editor = new Editor({
      extensions: [StarterKit]
    });

    component.editor = editor;

    directiveEl = fixture.debugElement.query(By.directive(EditorDirective));
    directiveInstance = directiveEl.injector.get(EditorDirective);

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const hostEl = fixture.debugElement.query(By.css('div'));
    const renderer = fixture.debugElement.injector.get(Renderer2);

    const directive = new EditorDirective(hostEl, renderer);
    expect(directive).toBeTruthy();
  });

  it('should attach the editor to the div', () => {
    expect(directiveEl).not.toBeNull();
    expect(fixture.debugElement.query(By.css('.ProseMirror'))).toBeTruthy();
  });

  it('should bind to the model correctly', async () => {
    component.value = 'Hi.';

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.value).toContain('Hi.');
  });

  it('should the model when editor is directly updated', () => {
    component.editor.chain().setContent('Hello World!').run();
    fixture.detectChanges();
    expect(component.value).toContain('Hello World!');
  });

  it('should disable the editor correctly', async () => {
    directiveInstance.setDisabledState(true);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(directiveEl.query(By.css('.ProseMirror[contenteditable=false]'))).toBeTruthy();
  });

  it('should set empty string as value', async () => {
    component.value = ''

    fixture.detectChanges();
    await fixture.whenStable();

    const editorEl: HTMLElement = directiveEl.query(By.css('.ProseMirror')).nativeElement
    expect(editorEl.textContent).toBe('');
  });

  it('should render json value correctly', async () => {
    component.value = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{
            type: 'text',
            text: 'Hello world!'
          }]
        },
      ],
    };

    fixture.detectChanges();
    await fixture.whenStable();

    const editorEl: HTMLElement = directiveEl.query(By.css('.ProseMirror')).nativeElement
    expect(editorEl.textContent).toBe('Hello world!');
  });
});


describe('NgxTiptapDirective: Reactive FormsModule', () => {
  @Component({
    template: `
      <form [formGroup]="form">
        <div tiptap [editor]="editor" formControlName="content"></div>
      </form>
      `,
  })
  class TestComponent {
    editor!: Editor;

    form = new FormGroup({
      content: new FormControl('Hello world!'),
    });

    get doc(): AbstractControl {
      return this.form.get('content') as AbstractControl;
    }
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [
        EditorDirective,
        TestComponent
      ],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    const editor = new Editor({
      extensions: [StarterKit]
    });

    component.editor = editor;
    fixture.detectChanges();
  });

  it('should be able to set value via forms API', () => {
    component.form.setValue({ content: 'Hey there!' });
    fixture.detectChanges();
    expect(component.editor.view.state.doc.textContent).toBe('Hey there!');

    component.doc.setValue('Hey.');
    fixture.detectChanges();
    expect(component.editor.view.state.doc.textContent).toBe('Hey.');
  });

  it('should clear editor content with form reset API', () => {
    expect(component.editor.view.state.doc.textContent).toBe('Hello world!');

    component.form.reset();
    fixture.detectChanges();
    expect(component.editor.view.state.doc.textContent).toBe('');

    component.doc.setValue('Hey.');
    fixture.detectChanges();
    expect(component.editor.view.state.doc.textContent).toBe('Hey.');

    component.doc.reset();
    fixture.detectChanges();
    expect(component.editor.view.state.doc.textContent).toBe('');
  });
});
