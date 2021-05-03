import { Component } from '@angular/core';
import { AngularNodeViewComponent } from 'ngx-tiptap';

@Component({
  selector: 'app-nodeview-counter',
  templateUrl: './nodeview-counter.component.html',
  styleUrls: ['./nodeview-counter.component.css']
})
export class NodeviewCounterComponent extends AngularNodeViewComponent {
  increment(): void {
    this.props.updateAttributes({
      count: this.props.node.attrs.count + 1
    })
  }
}
