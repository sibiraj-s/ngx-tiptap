import { Routes } from '@angular/router';

import { SimpleEditorComponent } from './simple-editor/simple-editor.component';
import { SimpleEditorReactiveComponent } from './simple-editor-reactive/simple-editor-reactive.component';
import { FloatingMenuComponent } from './floating-menu/floating-menu.component';
import { BubbleMenuComponent } from './bubble-menu/bubble-menu.component';
import { NodeviewRendererComponent } from './nodeview-renderer/nodeview-renderer.component';

export const routes: Routes = [
  {
    path: '',
    component: SimpleEditorComponent,
    title: 'Simple Editor',
  },
  {
    path: 'editor-reactive',
    component: SimpleEditorReactiveComponent,
    title: 'Reactive Forms',
  },
  {
    path: 'floating-menu',
    component: FloatingMenuComponent,
    title: 'Floating Menu',
  },
  {
    path: 'bubble-menu',
    component: BubbleMenuComponent,
    title: 'Bubble Menu',
  },
  {
    path: 'nodeview-renderer',
    component: NodeviewRendererComponent,
    title: 'Interactive NodeViews',
  },
];
