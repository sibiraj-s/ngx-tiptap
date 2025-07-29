import {
  ChangeDetectorRef, Component, DebugElement, ElementRef, input, model, Renderer2,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Content, Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

import { TiptapEditorDirective } from './editor.directive';

describe('NgxTiptapDirective', () => {
  @Component({
    template: '<div tiptap [editor]="editor()"></div>',
    imports: [FormsModule, TiptapEditorDirective],
  })
  class TestComponent {
    readonly editor = input.required<Editor>();
  }

  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        TestComponent,
        TiptapEditorDirective,
      ],
      providers: [
        {
          provide: ElementRef,
          useValue: new ElementRef(document.createElement('div')),
        },
        Renderer2,
        ChangeDetectorRef,
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

    const directiveEl = fixture.debugElement.query(By.directive(TiptapEditorDirective));
    const directiveInstance = directiveEl.injector.get(TiptapEditorDirective);

    expect(directiveInstance).toBeTruthy();
  });
});

describe('NgxTiptapDirective: FormsModule', () => {
  @Component({
    template: '<div tiptap [editor]="editor()" [(ngModel)]="value"></div>',
    imports: [FormsModule, TiptapEditorDirective],
  })
  class TestFormComponent {
    readonly editor = input.required<Editor>();
    value = model<Content>('Default Text');
  }

  let component: TestFormComponent;
  let fixture: ComponentFixture<TestFormComponent>;
  let directiveEl: DebugElement;
  let directiveInstance: TiptapEditorDirective;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        TestFormComponent,
        TiptapEditorDirective,
      ],
      providers: [
        {
          provide: ElementRef,
          useValue: new ElementRef(document.createElement('div')),
        },
        Renderer2,
        ChangeDetectorRef,
      ],
    });

    await TestBed.compileComponents();

    const editor = new Editor({
      extensions: [StarterKit],
    });

    fixture = TestBed.createComponent(TestFormComponent);
    fixture.componentRef.setInput('editor', editor);
    component = fixture.componentInstance;

    directiveEl = fixture.debugElement.query(By.directive(TiptapEditorDirective));
    directiveInstance = directiveEl.injector.get(TiptapEditorDirective);

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directiveInstance).toBeTruthy();
  });

  it('should attach the editor to the div', () => {
    expect(directiveEl).not.toBeNull();
    expect(fixture.debugElement.query(By.css('.ProseMirror'))).toBeTruthy();
  });

  it('should bind to the model correctly', async () => {
    component.value.set('Hi.');

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.value()).toContain('Hi.');
  });

  it('should update the model when directly updated using editor commands', async () => {
    component.editor().chain().setContent('Hello World!', { emitUpdate: true }).run();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.value()).toContain('Hello World!');
  });

  it('should not update the model when emitUpdate is set to false', async () => {
    component.editor().chain().setContent('Hello World!', { emitUpdate: false }).run();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.value()).not.toContain('Hello World!');
  });

  it('should update the model when marks are toggled directly using editor commands', async () => {
    component.editor()
      .chain()
      .setContent('Hello World!', { emitUpdate: true })
      .selectAll()
      .setBold()
      .run();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.value()).toBe('<p><strong>Hello World!</strong></p>');
  });

  it('should disable the editor correctly', async () => {
    directiveInstance.setDisabledState(true);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(directiveEl.query(By.css('.ProseMirror[contenteditable=false]'))).toBeTruthy();
  });

  it('should set empty string as value', async () => {
    component.value.set('');

    fixture.detectChanges();
    await fixture.whenStable();

    const editorEl: HTMLElement = directiveEl.query(By.css('.ProseMirror')).nativeElement;
    expect(editorEl.textContent).toBe('');
  });

  it('should render json value correctly', async () => {
    component.value.set({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{
            type: 'text',
            text: 'Hello world!',
          }],
        },
      ],
    });

    fixture.detectChanges();
    await fixture.whenStable();

    const editorEl: HTMLElement = directiveEl.query(By.css('.ProseMirror')).nativeElement;
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
    imports: [ReactiveFormsModule, FormsModule, TiptapEditorDirective],
  })
  class TestComponent {
    readonly editor = new Editor({
      extensions: [StarterKit],
    });

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
        TiptapEditorDirective,
        TestComponent,
      ],
      providers: [
        {
          provide: ElementRef,
          useValue: new ElementRef(document.createElement('div')),
        },
        Renderer2,
        ChangeDetectorRef,
      ],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

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
