import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[tiptapMarkViewContent]',
})
export class TiptapMarkViewContentDirective {
  @HostBinding('attr.data-mark-view-content') handle = '';
}
