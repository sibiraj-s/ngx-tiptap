import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { AngularNodeViewComponent, TiptapDraggableDirective, TiptapNodeViewContentDirective } from 'ngx-tiptap';

@Component({
  selector: 'app-nodeview-editable',
  imports: [CommonModule, TiptapDraggableDirective, TiptapNodeViewContentDirective],
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.css'],
})

export class NodeviewEditableComponent extends AngularNodeViewComponent { }
