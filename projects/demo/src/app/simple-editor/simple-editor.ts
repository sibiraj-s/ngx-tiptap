import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Content, Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { TiptapEditorDirective } from 'ngx-tiptap';

@Component({
  selector: 'app-simple-editor',
  imports: [CommonModule, FormsModule, TiptapEditorDirective],
  templateUrl: './simple-editor.html',
  styleUrls: ['./simple-editor.css'],
})
export class SimpleEditor implements OnDestroy {
  value: Content = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the <strong>industry's standard dummy text ever since the 1500s</strong>,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
    `;

  editor = new Editor({
    extensions: [
      StarterKit,
      Placeholder,
    ],
    editorProps: {
      attributes: {
        class: 'p-2 border-black border-2 rounded-b-md outline-none',
        spellCheck: 'false',
      },
    },
  });

  handleValueChange(value: Content): void {
    this.value = value;
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
