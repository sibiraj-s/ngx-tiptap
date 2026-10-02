import { Component, input } from '@angular/core';
import type { Editor } from '@tiptap/core';

@Component({
  template: '',
})
export class AngularWidgetComponent {
  readonly editor = input.required<Editor>();
  /** The document position the widget is rendered at. */
  readonly getPos = input.required<() => number | undefined>();
}
