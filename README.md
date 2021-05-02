# NgxTiptap

> Angular bindings for [tiptap v2](https://www.tiptap.dev/)

[![Tests](https://github.com/sibiraj-s/ngx-tiptap/actions/workflows/tests.yml/badge.svg)](https://github.com/sibiraj-s/ngx-tiptap/actions/workflows/tests.yml)
[![NPM Version](https://badgen.net/npm/v/ngx-tiptap)](https://www.npmjs.com/package/ngx-tiptap)
[![Total Downloads](https://badgen.net/npm/dt/ngx-tiptap)](https://www.npmjs.com/package/ngx-tiptap)
[![Monthly Downloads](https://badgen.net/npm/dm/ngx-tiptap)](https://www.npmjs.com/package/ngx-tiptap)
[![License](https://badgen.net/npm/license/ngx-tiptap)](https://github.com/sibiraj-s/ngx-tiptap/blob/master/LICENSE)

[demo on stackblitz](https://ngx-tiptap.stackblitz.io/) | [edit stackblitz](https://stackblitz.com/edit/ngx-tiptap)

## Installation

```bash
npm i ngx-tiptap

# or

yarn add ngx-tiptap
```

**Note**: This package just provides the bindings for angular. For configuring/customizing the editor, refer [tiptap's official documentation](https://www.tiptap.dev/).

For any issues with the editor. You may need to open the issue on [tiptap's repository](https://github.com/ueberdosis/tiptap/issues)

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
  template: './app.component.html',
})
export class AppComponent {
  editor = new Editor({
    extensions: defaultExtensions(),
  });

  value = '<p>Hello, Tiptap!</p>'; // can be HTML or JSON, see https://www.tiptap.dev/api/editor#content
}
```

and in HTML

```html
<tiptap [editor]="editor" [(ngModel)]="value"></tiptap>
```

**Note**: No styling is provided by default. You are in full control of how your editor looks. Refer [tiptaps's styling guide](https://www.tiptap.dev/guide/styling) for more information.

And, Since the editor is dynamically created you may need to set [ViewEncapsulation](https://angular.io/guide/view-encapsulation) to `None` apply the styles.

## Options

- outputFormat [`json` or `html`] - defaults to html.

You can get the json or html format from the editor directly as well.

Refer https://www.tiptap.dev/guide/output#export

### Floating Menu

This will make a contextual menu appear near a selection of text.

The markup and styling is totally up to you.

```html
<tiptap-editor [editor]="editor"></tiptap-editor>
<tiptap-floating-menu [editor]="editor">
  <!-- Anything that should be rendered inside floating menu -->
</tiptap-floating-menu>
```

Refer: https://www.tiptap.dev/api/extensions/floating-menu

### Bubble Menu

This will make a contextual menu appear near a selection of text. Use it to let users apply marks to their text selection.

The markup and styling is totally up to you.

```html
<tiptap-editor [editor]="editor"></tiptap-editor>
<tiptap-bubble-menu [editor]="editor">
  <!-- Anything that should be rendered inside bubble menu -->
</tiptap-bubble-menu>
```

Refer: https://www.tiptap.dev/api/extensions/bubble-menu

### TODO's

- [ ] Nodeview Renderer
