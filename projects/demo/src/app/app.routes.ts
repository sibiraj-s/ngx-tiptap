import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./simple-editor/simple-editor.component').then((m) => m.SimpleEditorComponent),
    title: 'Simple Editor',
  },
  {
    path: 'editor-reactive',
    loadComponent: () => import('./simple-editor-reactive/simple-editor-reactive.component').then((m) => m.SimpleEditorReactiveComponent),
    title: 'Reactive Forms',
  },
  {
    path: 'floating-menu',
    loadComponent: () => import('./floating-menu/floating-menu.component').then((m) => m.FloatingMenuComponent),
    title: 'Floating Menu',
  },
  {
    path: 'bubble-menu',
    loadComponent: () => import('./bubble-menu/bubble-menu.component').then((m) => m.BubbleMenuComponent),
    title: 'Bubble Menu',
  },
  {
    path: 'nodeview-renderer',
    loadComponent: () => import('./nodeview-renderer/nodeview-renderer.component').then((m) => m.NodeviewRendererComponent),
    title: 'Interactive NodeViews',
  },
];
