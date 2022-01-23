import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SimpleEditorComponent } from './simple-editor/simple-editor.component';
import { FloatingMenuComponent } from './floating-menu/floating-menu.component';
import { BubbleMenuComponent } from './bubble-menu/bubble-menu.component';
import { NodeviewRendererComponent } from './nodeview-renderer/nodeview-renderer.component';

const routes: Routes = [
  { path: '', component: SimpleEditorComponent },
  { path: 'floating', component: FloatingMenuComponent },
  { path: 'bubble', component: BubbleMenuComponent },
  { path: 'nodeview-renderer', component: NodeviewRendererComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
