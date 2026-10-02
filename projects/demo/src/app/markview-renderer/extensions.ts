import { Injector } from '@angular/core';
import { Mark, mergeAttributes } from '@tiptap/core';
import { AngularMarkViewRenderer } from 'ngx-tiptap';

import { MarkviewHighlight } from './markviews/highlight/highlight';

export const HighlightComponentExtension = (injector: Injector): Mark => {
  return Mark.create({
    name: 'angularHighlightComponent',

    addAttributes() {
      return {
        color: {
          default: 'yellow',
        },
      };
    },

    parseHTML() {
      return [{ tag: 'mark' }];
    },

    renderHTML({ HTMLAttributes }) {
      return ['mark', mergeAttributes(HTMLAttributes), 0];
    },

    addMarkView() {
      return AngularMarkViewRenderer(MarkviewHighlight, { injector });
    },
  });
};
