# NgxTiptap

> Angular bindings for [tiptap v2](https://www.tiptap.dev/)

[![Tests](https://github.com/sibiraj-s/ngx-tiptap/actions/workflows/tests.yml/badge.svg)](https://github.com/sibiraj-s/ngx-tiptap/actions/workflows/tests.yml)
[![NPM Version](https://badgen.net/npm/v/ngx-tiptap)](https://www.npmjs.com/package/ngx-tiptap)
[![Total Downloads](https://badgen.net/npm/dt/ngx-tiptap)](https://www.npmjs.com/package/ngx-tiptap)
[![Monthly Downloads](https://badgen.net/npm/dm/ngx-tiptap)](https://www.npmjs.com/package/ngx-tiptap)
[![License](https://badgen.net/npm/license/ngx-tiptap)](https://github.com/sibiraj-s/ngx-tiptap/blob/master/LICENSE)
[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/sibiraj-s/ngx-tiptap)

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
import StarterKit from '@tiptap/starter-kit';

@Component({
  selector: 'app-root',
  template: './app.component.html',
})
export class AppComponent {
  editor = new Editor({
    extensions: [StarterKit],
  });

  value = '<p>Hello, Tiptap!</p>'; // can be HTML or JSON, see https://www.tiptap.dev/api/editor#content
}
```

and in HTML

```html
<tiptap-editor [editor]="editor" [(ngModel)]="value"></tiptap-editor>
```

**Note**: No styling is provided by default. You are in full control of how your editor looks. Refer [tiptaps's styling guide](https://www.tiptap.dev/guide/styling) for more information.

And, Since the editor is dynamically created you may need to set [ViewEncapsulation](https://angular.io/guide/view-encapsulation) to `None` apply the styles.

## Options

- outputFormat [`json` or `html`] - defaults to html.

You can get the json or html format from the editor directly as well.

Refer https://www.tiptap.dev/guide/output#export

## Extensions

Refer: https://www.tiptap.dev/api/extensions

### Floating Menu

This will make a contextual menu appear near a selection of text.

The markup and styling are totally up to you.

```html
<tiptap-editor [editor]="editor"></tiptap-editor>
<tiptap-floating-menu [editor]="editor">
  <!-- Anything that should be rendered inside floating menu -->
</tiptap-floating-menu>
```

Refer: https://www.tiptap.dev/api/extensions/floating-menu

### Bubble Menu

This will make a contextual menu appear near a selection of text. Use it to let users apply marks to their text selection.

The markup and styling are totally up to you.

```html
<tiptap-editor [editor]="editor"></tiptap-editor>
<tiptap-bubble-menu [editor]="editor">
  <!-- Anything that should be rendered inside bubble menu -->
</tiptap-bubble-menu>
```

Refer: https://www.tiptap.dev/api/extensions/bubble-menu

## AngularNodeViewRenderer

This enables rendering Angular Components as NodeViews.

### Create a Node Extension

```ts
import { Injector } from '@angular/core';
import { Node, mergeAttributes } from '@tiptap/core';
import { AngularNodeViewRenderer } from 'ngx-tiptap';

import { NodeviewCounterComponent } from './nodeview-counter/nodeview-counter.component';

const AngularExtension = (injector: Injector): Node => {
  return Node.create({
    // ...configuration
    parseHTML() {
      return [{ tag: 'angular-component-counter' }];
    },
    renderHTML({ HTMLAttributes }) {
      return ['angular-component-counter', mergeAttributes(HTMLAttributes)];
    },
    addNodeView() {
      return AngularNodeViewRenderer(NodeviewCounterComponent, { injector });
    },
  });
};

export default AngularExtension;
```

### Create a Component

```ts
import { Component } from '@angular/core';
import { AngularNodeViewComponent } from 'ngx-tiptap';

@Component({
  selector: 'app-nodeview-counter',
})
export class NodeviewCounterComponent extends AngularNodeViewComponent {
  increment(): void {
    this.props.updateAttributes({
      count: this.props.node.attrs.count + 1,
    });
  }
}
```

### Use the extension

```ts
import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

import AngularExtension from './AngularExtension';

export class AppComponent implements OnInit {
  editor: Editor;

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    this.editor = new Editor({
      content: `
        <p>This is still the text editor you’re used to, but enriched with node views.</p>
        <angular-component-counter count="0"></angular-component-counter>
      `,
      extensions: [StarterKit, AngularExtension(this.injector)],
      editorProps: {
        attributes: {
          class: 'p-2 border-black focus:border-blue-700 border-2 rounded-md outline-none',
        },
      },
    });
  }
}
```

### Access/Update Attributes

You will recieve `attribues` and `updateAttributes` via Input. You can access it directly like this.

```ts
this.props.node.attrs;
```

To update the attributes

```ts
this.props.updateAttributes({
  count: this.props.node.attrs.count + 1,
});
```

### Adding a content editable

There is another directive called `tiptapNodeViewContent` which helps you adding editable content to your node view. Here is an example.

```html
<!-- editable.component.html -->
<div class="angular-component-with-content">
  <p tiptapNodeViewContent></p>
</div>
```

Refer: https://www.tiptap.dev/guide/node-views/react/#adding-a-content-editable

### Dragging

To make your node views draggable, set `draggable: true` in the extension and add `tiptapDraggable` directive to the DOM element inside the component that should function as the drag handle.

### AngularRenderer

You can also manully render the angular components using `AngularRenderer`.

```ts
import { AngularRenderer } from 'ngx-tiptap';

const renderer = new AngularRenderer(Component, injector);

renderer.instance; // get the instance of the component, can be used to update `@Input` properties
renderer.dom; // get the HTMLElement for the component
renderer.destroy(); // destroy the component and its instance
```

## Contributing

All types of contributions are welcome. See [CONTRIBUTING.md][./.github/contributing.md] to get started.
