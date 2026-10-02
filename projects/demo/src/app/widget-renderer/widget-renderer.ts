import { Component, Injector, OnDestroy, inject } from '@angular/core';

import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

import { TiptapEditorDirective } from 'ngx-tiptap';

import { WordCountExtension } from './extensions';

@Component({
  selector: 'app-widget-renderer',
  imports: [TiptapEditorDirective],
  templateUrl: './widget-renderer.component.html',
  styleUrls: ['./widget-renderer.css'],
})
export class WidgetRenderer implements OnDestroy {
  private injector = inject(Injector);

  editor = new Editor({
    editable: true,
    content: `
      <p>Widgets render Angular components between the content, without being part of the document.</p>
      <p>The word count at the end updates while you type. Click it to switch to characters, the component keeps its state.</p>
    `,
    extensions: [
      StarterKit,
      WordCountExtension(this.injector),
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
