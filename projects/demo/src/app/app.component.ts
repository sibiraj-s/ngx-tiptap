import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

import { CounterComponentExtension, EditableComponentExtension } from './extensions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(private injector: Injector) { }

  value = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the <strong>industry's standard dummy text</strong> ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book`

  editor = new Editor({
    extensions: [
      StarterKit,
      Placeholder
    ],
    editorProps: {
      attributes: {
        class: 'p-2 border-black focus:border-blue-700 border-2 rounded-md outline-none',
        spellCheck: 'false'
      }
    }
  })

  editorF = new Editor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: 'p-2 border-black focus:border-blue-700 border-2 rounded-md outline-none',
        spellCheck: 'false'
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
        class: 'p-2 border-black focus:border-blue-700 border-2 rounded-md outline-none',
        spellCheck: 'false'
      }
    }
  })

  editorN = new Editor({
    editable: true,
    content: `
      <p>This is still the text editor you're used to, but enriched with node views.</p>
      <angular-component-counter count="0"></angular-component-counter>
      <p>The below is another counter component with different scope, The count is preset to "1"</p>
      <angular-component-counter count="1"></angular-component-counter>
      <p>You can also create an editable component item inside the component</p>
      <angular-component-editable><p>This text is editable</p></angular-component-editable>
      <p>Did you see that? These are Angular components. We are really living in the future.</p>
    `,
    extensions: [
      StarterKit,
      Placeholder,
      CounterComponentExtension(this.injector),
      EditableComponentExtension(this.injector)
    ],
    editorProps: {
      attributes: {
        class: 'p-2 border-black focus:border-blue-700 border-2 rounded-md outline-none'
      }
    }
  });
}
