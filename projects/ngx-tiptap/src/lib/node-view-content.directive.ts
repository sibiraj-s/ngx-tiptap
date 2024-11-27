import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[tiptapNodeViewContent]',
  standalone: true,
})
export class TiptapNodeViewContentDirective {
  @HostBinding('attr.data-node-view-content') handle = '';
  @HostBinding('style.white-space') whiteSpace = 'pre-wrap';
}
