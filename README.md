# NgxTiptap

> Angular bindings for [tiptap v2](https://www.tiptap.dev/)

[![Tests](https://github.com/sibiraj-s/ngx-tiptap/actions/workflows/tests.yml/badge.svg)](https://github.com/sibiraj-s/ngx-tiptap/actions/workflows/tests.yml)
[![NPM Version](https://badgen.net/npm/v/ngx-tiptap)](https://www.npmjs.com/package/ngx-tiptap)
[![Total Downloads](https://badgen.net/npm/dt/ngx-tiptap)](https://www.npmjs.com/package/ngx-tiptap)
[![Monthly Downloads](https://badgen.net/npm/dm/ngx-tiptap)](https://www.npmjs.com/package/ngx-tiptap)
[![License](https://badgen.net/npm/license/ngx-tiptap)](https://github.com/sibiraj-s/ngx-editor/blob/master/LICENSE)

[demo on stackblitz](https://ngx-tiptap.stackblitz.io/) | [edit stackblitz](https://stackblitz.com/edit/ngx-tiptap)

## Installation

```bash
npm i ngx-tiptap

# or

yarn add ngx-tiptap
```

## Usage

Import the module

```ts
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NgxTiptapModule } from 'ngx-tiptap';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, NgxTiptapModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Create an instance of the editor

```ts
import { Component } from '@angular/core';
import { Editor } from '@tiptap/core';
import { defaultExtensions } from '@tiptap/starter-kit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  editor = new Editor({
    extensions: defaultExtensions(),
  });

  value = 'Hello, Tiptap!';
}
```

and in HTML

```html
<tiptap [editor]="editor" [(ngModel)]="value"></tiptap>
```

**Note**: No styling is provided by default. You are in full control of how your editor looks. See the [styling guide](https://www.tiptap.dev/guide/styling) for more information.

And, Since the editor is dynamically created you may need to set [view-encapsulation](https://angular.io/guide/view-encapsulation) to `None` apply the styles.
