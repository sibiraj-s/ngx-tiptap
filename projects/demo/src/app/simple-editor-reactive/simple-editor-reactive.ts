import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Content, Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { TiptapEditorDirective } from 'ngx-tiptap';

@Component({
  selector: 'app-simple-editor-reactive',
  imports: [CommonModule, ReactiveFormsModule, TiptapEditorDirective],
  templateUrl: './simple-editor-reactive.html',
  styleUrls: ['./simple-editor-reactive.css'],
})
export class SimpleEditorReactive implements OnDestroy {
  value: Content = `amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit
   sed vulputate mi sit amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien
   et ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit amet mattis
   vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere ac ut.
   `;

  reactiveForm = new FormGroup({
    content: new FormControl(this.value),
  });

  editor = new Editor({
    extensions: [
      StarterKit,
      Placeholder,
    ],
    editorProps: {
      attributes: {
        class: 'p-2 border-black border-2 rounded-b-md outline-hidden',
        spellCheck: 'false',
      },
    },
  });

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
