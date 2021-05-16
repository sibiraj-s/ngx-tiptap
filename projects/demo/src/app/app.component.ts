import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

import { AngularComponent, AngularEditableComponent } from './extensions';

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
      StarterKit,
      Placeholder
    ],
    editorProps: {
      attributes: {
        class: 'p-2 border-black focus:border-blue-700 border-2 rounded-md outline-none'
      }
    }
  })

  editorF = new Editor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: 'p-2 border-black focus:border-blue-700 border-2 rounded-md outline-none'
      }
    }
  })

  editorB = new Editor({
    extensions: [
      StarterKit,
      Placeholder,
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
        <p>The below is another counter component with different scope, The count is preset to "1"</p>
        <angular-component-counter count="1"></angular-component-counter>
        <p>You can also create an editable component item inside the component</p>
        <angular-component-editable><p>This is editable</p></angular-component-editable>
        <p>Did you see that? These are Angular components. We are really living in the future.</p>
      `,
      extensions: [
        StarterKit,
        Placeholder,
        AngularComponent(this.injector),
        AngularEditableComponent(this.injector)
      ],
      editorProps: {
        attributes: {
          class: 'p-2 border-black focus:border-blue-700 border-2 rounded-md outline-none'
        }
      }
    });
  }
}
