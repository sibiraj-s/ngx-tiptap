import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[tiptapDraggable]',
})
export class TiptapDraggableDirective {
  @HostBinding('attr.draggable') draggable = true;
  @HostBinding('attr.data-drag-handle') handle = '';
}
