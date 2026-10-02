import { Injector } from '@angular/core';
import { Extension } from '@tiptap/core';
import { AngularWidgetRenderer } from 'ngx-tiptap';

import { WidgetWordCount } from './widgets/word-count/word-count';

export const WordCountExtension = (injector: Injector): Extension => {
  return Extension.create({
    name: 'angularWordCountWidget',

    addDecorations() {
      return {
        create: ({ editor, state }) => {
          const last = state.doc.lastChild;

          if (!last?.isTextblock) {
            return [];
          }

          const text = state.doc.textBetween(0, state.doc.content.size, ' ');

          return [
            AngularWidgetRenderer(WidgetWordCount, {
              editor,
              injector,
              // the end of the last paragraph
              pos: state.doc.content.size - 1,
              side: 1,
              // a stable key keeps the component and its state while typing
              key: 'word-count',
              props: {
                words: text.split(/\s+/).filter(Boolean).length,
                characters: text.length,
              },
            }),
          ];
        },
      };
    },
  });
};
