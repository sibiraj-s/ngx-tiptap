import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { AngularNodeViewComponent, TiptapDraggableDirective, TiptapNodeViewContentDirective } from 'ngx-tiptap';

@Component({
  selector: 'app-nodeview-editable',
  imports: [CommonModule, TiptapDraggableDirective, TiptapNodeViewContentDirective],
  templateUrl: './editable.html',
  styleUrls: ['./editable.css'],
})

export class NodeviewEditable extends AngularNodeViewComponent { }
