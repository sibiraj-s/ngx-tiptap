import { NgModule } from '@angular/core';

import { EditorDirective } from './editor.directive';
import { FloatingMenuDirective } from './floating-menu.directive';
import { BubbleMenuDirective } from './bubble-menu.directive';
import { DraggableDirective } from './draggable.directive';

@NgModule({
  declarations: [
    EditorDirective,
    FloatingMenuDirective,
    BubbleMenuDirective,
    DraggableDirective,
  ],
  exports: [
    EditorDirective,
    FloatingMenuDirective,
    BubbleMenuDirective,
    DraggableDirective
  ]
})
export class NgxTiptapModule { }
