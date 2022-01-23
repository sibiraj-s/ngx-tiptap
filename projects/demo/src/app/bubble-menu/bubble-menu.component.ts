import { Component } from '@angular/core';
import { Editor } from '@tiptap/core';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';

@Component({
  selector: 'app-bubble-menu',
  templateUrl: './bubble-menu.component.html',
  styleUrls: ['./bubble-menu.component.css']
})
export class BubbleMenuComponent {
  value = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the <strong>industry's standard dummy text</strong> ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book`

  editor = new Editor({
    extensions: [
      StarterKit,
      Placeholder,
    ],
    editorProps: {
      attributes: {
        class: 'p-2 border-black focus:border-blue-700 border-2 rounded-md outline-none',
        spellCheck: 'false'
      }
    }
  })
}
