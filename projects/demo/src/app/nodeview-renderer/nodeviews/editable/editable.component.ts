import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { AngularNodeViewComponent } from 'ngx-tiptap';

@Component({
  selector: 'app-nodeview-editable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.css'],
})

export class NodeviewEditableComponent extends AngularNodeViewComponent { }
