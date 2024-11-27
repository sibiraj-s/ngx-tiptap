import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { AngularNodeViewComponent, TiptapDraggableDirective, NodeViewContentDirective } from 'ngx-tiptap';

@Component({
  selector: 'app-nodeview-editable',
  standalone: true,
  imports: [CommonModule, TiptapDraggableDirective, NodeViewContentDirective],
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.css'],
})

export class NodeviewEditableComponent extends AngularNodeViewComponent { }
