import { Component } from '@angular/core';

import { AngularMarkViewComponent, TiptapMarkViewContentDirective } from 'ngx-tiptap';

const colors = ['yellow', 'green', 'pink'];

@Component({
  selector: 'app-markview-highlight',
  imports: [TiptapMarkViewContentDirective],
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.css'],
})
export class MarkviewHighlight extends AngularMarkViewComponent {
  nextColor(): void {
    const index = colors.indexOf(this.mark().attrs['color']);

    this.updateAttributes()({
      color: colors[(index + 1) % colors.length],
    });
  }
}
