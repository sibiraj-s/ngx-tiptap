import { Component, Injector, OnDestroy, inject } from '@angular/core';

import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

import { TiptapEditorDirective } from 'ngx-tiptap';

import { HighlightComponentExtension } from './extensions';

@Component({
  selector: 'app-markview-renderer',
  imports: [TiptapEditorDirective],
  templateUrl: './markview-renderer.component.html',
  styleUrls: ['./markview-renderer.css'],
})
export class MarkviewRenderer implements OnDestroy {
  private injector = inject(Injector);

  editor = new Editor({
    editable: true,
    content: `
      <p>Marks can be rendered with Angular components too. <mark>This text is highlighted</mark> by a component.</p>
      <p>Click the button next to the <mark color="green">highlighted text</mark> to change its color, the text stays editable.</p>
    `,
    extensions: [
      StarterKit,
      HighlightComponentExtension(this.injector),
    ],
    editorProps: {
      attributes: {
        class: 'p-2 border-black focus:border-blue-500 border-2 rounded-md outline-hidden',
      },
    },
  });

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
