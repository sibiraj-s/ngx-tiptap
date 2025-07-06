import { Component, Injector, OnDestroy, inject } from '@angular/core';

import { Editor } from '@tiptap/core';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';

import { TiptapEditorDirective } from 'ngx-tiptap';

import { CounterComponentExtension, EditableComponentExtension } from './extensions';

@Component({
  selector: 'app-nodeview-renderer',
  imports: [TiptapEditorDirective],
  templateUrl: './nodeview-renderer.html',
  styleUrls: ['./nodeview-renderer.css'],
})
export class NodeviewRenderer implements OnDestroy {
  private injector = inject(Injector);

  editor = new Editor({
    editable: true,
    content: `
      <p>This is still the text editor you're used to, but enriched with node views.</p>
      <angular-component-counter count="0"></angular-component-counter>
      <p>The below is another counter component with different scope, The count is preset to "1"</p>
      <angular-component-counter count="1"></angular-component-counter>
      <p>You can also create an editable component item inside the component</p>
      <angular-component-editable>This text is editable</angular-component-editable>
      <p>Did you see that? These are Angular components. We are really living in the future.</p>
    `,
    extensions: [
      StarterKit,
      Placeholder,
      CounterComponentExtension(this.injector),
      EditableComponentExtension(this.injector),
    ],
    editorProps: {
      attributes: {
        class: 'p-2 border-black focus:border-blue-700 border-2 rounded-md outline-none',
      },
    },
  });

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
