import { NgModule } from '@angular/core';

import { EditorDirective } from './editor.directive';
import { FloatingMenuDirective } from './floating-menu.directive';
import { BubbleMenuDirective } from './bubble-menu.directive';

@NgModule({
  declarations: [
    EditorDirective,
    FloatingMenuDirective,
    BubbleMenuDirective,
  ],
  exports: [
    EditorDirective,
    FloatingMenuDirective,
    BubbleMenuDirective
  ]
})
export class NgxTiptapModule { }
