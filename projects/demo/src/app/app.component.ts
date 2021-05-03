import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { Editor } from '@tiptap/core';
import { defaultExtensions } from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

import AngularExtension from './AngularExtension';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
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

  editorF = new Editor({
    extensions: defaultExtensions(),
    editorProps: {
      attributes: {
        class: 'p-2 border-black focus:border-blue-700 border-2 rounded-md outline-none'
      }
    }
  })

  editorB = new Editor({
    extensions: [
      ...defaultExtensions(),
      Placeholder,
      AngularExtension(this.injector)
    ],
    editorProps: {
      attributes: {
        class: 'p-2 border-black focus:border-blue-700 border-2 rounded-md outline-none'
      }
    }
  })

  editorA: Editor

  constructor(private injector: Injector) { }

  ngOnInit(): void {
    this.editorA = new Editor({
      content: `
        <p>This is still the text editor you’re used to, but enriched with node views.</p>
        <angular-component-counter count="0"></angular-component-counter>
        <p>Did you see that? That’s a Angular component. We are really living in the future.</p>
        <p>The below is another counter component with different scope, The count is preset to "1"</p>
        <angular-component-counter count="1"></angular-component-counter>
      `,
      extensions: [
        ...defaultExtensions(),
        Placeholder,
        AngularExtension(this.injector)
      ],
      editorProps: {
        attributes: {
          class: 'p-2 border-black focus:border-blue-700 border-2 rounded-md outline-none'
        }
      }
    })
  }
}
