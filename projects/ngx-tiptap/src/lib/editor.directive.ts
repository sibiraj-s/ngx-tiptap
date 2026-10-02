import {
  AfterViewInit, ChangeDetectorRef, Directive, ElementRef, forwardRef, OnChanges, OnDestroy, OnInit, Renderer2,
  SimpleChanges, inject, input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Content, Editor, type EditorEvents } from '@tiptap/core';

type EditorWithContentComponent = Editor & {
  isEditorContentInitialized?: boolean;
};

@Directive({
  selector: 'tiptap[editor], [tiptap][editor], tiptap-editor[editor], [tiptapEditor][editor]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TiptapEditorDirective),
    multi: true,
  }],
})

export class TiptapEditorDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy, ControlValueAccessor {
  protected elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  protected renderer = inject(Renderer2);
  protected changeDetectorRef = inject(ChangeDetectorRef);

  readonly editor = input.required<Editor | null | undefined>();
  readonly outputFormat = input<'json' | 'html'>('html');

  protected onChange: (value: Content) => void = () => { /** */ };
  protected onTouched: () => void = () => { /** */ };

  // inner contents of the element and the value set by the forms api before the editor is initialized
  private initialContent = '';
  private value: { content: Content } | null = null;
  private disabled = false;

  // Writes a new value to the element.
  // This methods is called when programmatic changes from model to view are requested.
  writeValue(value: Content): void {
    const editor = this.editor();

    if (!editor) {
      this.value = { content: value };
      return;
    }

    editor.chain().setContent(value, { emitUpdate: false }).run();
  }

  // Registers a callback function that is called when the control's value changes in the UI.
  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  // Registers a callback function that is called by the forms API on initialization to update the form model on blur.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Called by the forms api to enable or disable the element
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.editor()?.setEditable(!isDisabled);
    this.renderer.setProperty(this.elRef.nativeElement, 'disabled', isDisabled);
  }

  protected handleChange = ({ editor, transaction }: EditorEvents['transaction']): void => {
    if (!transaction.docChanged) {
      return;
    }

    // Needed for ChangeDetectionStrategy.OnPush to get notified about changes
    this.changeDetectorRef.markForCheck();

    if (this.outputFormat() === 'html') {
      this.onChange(editor.getHTML());
      return;
    }

    this.onChange(editor.getJSON());
  };

  protected handleBlur = (): void => {
    this.onTouched();
  };

  // Needed for ChangeDetectionStrategy.OnPush to get notified
  protected handleSelectionUpdate = (): void => {
    this.changeDetectorRef.markForCheck();
  };

  ngOnInit(): void {
    // take the inner contents and clear the block
    this.initialContent = this.elRef.nativeElement.innerHTML;
    this.elRef.nativeElement.innerHTML = '';

    this.init();
  }

  // the editor content should be re-created whenever the editor instance changes
  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['editor'];

    if (!change || change.firstChange) {
      return;
    }

    this.destroy(change.previousValue);
    this.init();
  }

  init(): void {
    const editor = this.editor() as EditorWithContentComponent | null | undefined;

    if (editor && !editor.isDestroyed && editor.view.dom?.parentNode) {
      if (editor.isEditorContentInitialized) {
        return;
      }

      const element = this.elRef.nativeElement;

      element.append(...Array.from(editor.view.dom.parentNode.childNodes));

      editor.setOptions({
        element,
      });

      // update content to the editor
      if (this.initialContent) {
        editor.chain().setContent(this.initialContent, { emitUpdate: false }).run();
        this.initialContent = '';
      }

      if (this.value) {
        editor.chain().setContent(this.value.content, { emitUpdate: false }).run();
        this.value = null;
      }

      if (this.disabled) {
        editor.setEditable(false);
      }

      // register blur handler to update `touched` property
      editor.on('blur', this.handleBlur);

      // register update handler to listen to changes on update
      editor.on('update', this.handleChange);

      editor.on('selectionUpdate', this.handleSelectionUpdate);

      editor.isEditorContentInitialized = true;
    }
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy(this.editor());
  }

  destroy(editor: EditorWithContentComponent | null | undefined): void {
    if (!editor) {
      return;
    }

    editor.isEditorContentInitialized = false;

    // the editor can outlive the directive, so remove the handlers registered on it
    editor.off('blur', this.handleBlur);
    editor.off('update', this.handleChange);
    editor.off('selectionUpdate', this.handleSelectionUpdate);

    // try to reset the editor element
    // may fail if this editor's view.dom was never initialized/mounted yet
    try {
      if (!editor.view.dom?.parentNode) {
        return;
      }

      const newElement = document.createElement('div');

      newElement.append(...Array.from(editor.view.dom.parentNode.childNodes));

      editor.setOptions({
        element: newElement,
      });
    } catch {
      // do nothing, nothing to reset
    }
  }
}
