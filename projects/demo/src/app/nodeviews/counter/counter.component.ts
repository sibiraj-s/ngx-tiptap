import { Component } from '@angular/core';
import { AngularNodeViewComponent } from 'ngx-tiptap';

@Component({
  selector: 'app-nodeview-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})

export class NodeviewCounterComponent extends AngularNodeViewComponent {
  increment(): void {
    this.updateAttributes({
      count: this.node.attrs.count + 1
    });
  }
}
