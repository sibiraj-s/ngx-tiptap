import { RenderMode, ServerRoute } from '@angular/ssr';

// tiptap editors require a browser DOM and cannot be rendered on the server
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
