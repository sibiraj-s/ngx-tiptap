import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./simple-editor/simple-editor').then((m) => m.SimpleEditor),
    title: 'Simple Editor',
  },
  {
    path: 'editor-reactive',
    loadComponent: () => import('./simple-editor-reactive/simple-editor-reactive').then((m) => m.SimpleEditorReactive),
    title: 'Reactive Forms',
  },
  {
    path: 'floating-menu',
    loadComponent: () => import('./floating-menu/floating-menu').then((m) => m.FloatingMenu),
    title: 'Floating Menu',
  },
  {
    path: 'bubble-menu',
    loadComponent: () => import('./bubble-menu/bubble-menu').then((m) => m.BubbleMenu),
    title: 'Bubble Menu',
  },
  {
    path: 'nodeview-renderer',
    loadComponent: () => import('./nodeview-renderer/nodeview-renderer').then((m) => m.NodeviewRenderer),
    title: 'Interactive NodeViews',
  },
  {
    path: 'markview-renderer',
    loadComponent: () => import('./markview-renderer/markview-renderer').then((m) => m.MarkviewRenderer),
    title: 'MarkViews',
  },
  {
    path: 'widget-renderer',
    loadComponent: () => import('./widget-renderer/widget-renderer').then((m) => m.WidgetRenderer),
    title: 'Widgets',
  },
];
