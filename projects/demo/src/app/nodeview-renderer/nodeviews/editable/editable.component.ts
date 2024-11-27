import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { AngularNodeViewComponent, DraggableDirective, EditorDirective, NodeViewContentDirective } from 'ngx-tiptap';

@Component({
  selector: 'app-nodeview-editable',
  standalone: true,
  imports: [CommonModule, EditorDirective, DraggableDirective, NodeViewContentDirective],
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.css'],
})

export class NodeviewEditableComponent extends AngularNodeViewComponent { }
