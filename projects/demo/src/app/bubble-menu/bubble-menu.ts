import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Editor } from '@tiptap/core';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import { TiptapBubbleMenuDirective, TiptapEditorDirective } from 'ngx-tiptap';

@Component({
  selector: 'app-bubble-menu',
  imports: [CommonModule, FormsModule, TiptapEditorDirective, TiptapBubbleMenuDirective],
  templateUrl: './bubble-menu.html',
  styleUrls: ['./bubble-menu.css'],
})
export class BubbleMenu implements OnDestroy {
  value = `<p>Hey, try to select some text here.
  There will popup a menu for selecting some inline styles.</p>
  <p>Remember: you have full control about content and styling of this menu.</p>`;

  editor = new Editor({
    extensions: [
      StarterKit,
      Placeholder,
    ],
    editorProps: {
      attributes: {
        class: 'p-2 border-black focus:border-blue-700 border-2 rounded-md outline-hidden',
        spellCheck: 'false',
      },
    },
  });

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
