import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { AngularNodeViewComponent, TiptapDraggableDirective } from 'ngx-tiptap';

@Component({
  selector: 'app-nodeview-counter',
  imports: [CommonModule, TiptapDraggableDirective],
  templateUrl: './counter.html',
  styleUrls: ['./counter.css'],
})

export class NodeviewCounter extends AngularNodeViewComponent {
  increment(): void {
    const updateAttributes = this.updateAttributes();

    updateAttributes({
      count: this.node().attrs['count'] + 1,
    });
  }
}
