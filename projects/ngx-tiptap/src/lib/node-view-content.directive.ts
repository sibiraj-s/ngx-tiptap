import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[tiptapNodeViewContent]',
})
export class TiptapNodeViewContentDirective {
  @HostBinding('attr.data-node-view-content') handle = '';
  @HostBinding('style.white-space') whiteSpace = 'pre-wrap';
}
