import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { NgxTiptapModule } from 'ngx-tiptap';

@Component({
  selector: 'app-floating-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxTiptapModule],
  templateUrl: './floating-menu.component.html',
  styleUrls: ['./floating-menu.component.css'],
})
export class FloatingMenuComponent implements OnDestroy {
  value = 'This is an example of a Medium-like editor. Enter a new line and some buttons will appear.';

  editor = new Editor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: 'p-2 border-black focus:border-blue-700 border-2 rounded-md outline-none',
        spellCheck: 'false',
      },
    },
  });

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
