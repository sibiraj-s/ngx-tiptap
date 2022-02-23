import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SimpleEditorComponent } from './simple-editor/simple-editor.component';
import { FloatingMenuComponent } from './floating-menu/floating-menu.component';
import { BubbleMenuComponent } from './bubble-menu/bubble-menu.component';
import { NodeviewRendererComponent } from './nodeview-renderer/nodeview-renderer.component';

const routes: Routes = [
  {
    path: '',
    component: SimpleEditorComponent,
    data: {
      title: 'Simple Editor',
    },
  },
  {
    path: 'floating-menu',
    component: FloatingMenuComponent,
    data: {
      title: 'Floating Menu',
    },
  },
  {
    path: 'bubble-menu',
    component: BubbleMenuComponent,
    data: {
      title: 'Bubble Menu',
    },
  },
  {
    path: 'nodeview-renderer',
    component: NodeviewRendererComponent,
    data: {
      title: 'NodeviewRenderer',
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
