import { Directive } from '@angular/core';

@Directive({
  selector: '[tiptapDraggable]',
  host: {
    '[attr.draggable]': 'true',
    '[attr.data-drag-handle]': '""',
  },
})
export class TiptapDraggableDirective {}
