import { Component, ViewEncapsulation } from '@angular/core';
import { Editor } from '@tiptap/core';
import { defaultExtensions } from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  value = '<p>Hello, Tiptap!</p>'

  editor = new Editor({
    extensions: [
      ...defaultExtensions(),
      Placeholder
    ],
    editorProps: {
      attributes: {
        class: 'p-2 border-black focus:border-blue-700 border-2 rounded-md outline-none'
      }
    }
  })
}
