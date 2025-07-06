import { Injector } from '@angular/core';
import { Node, mergeAttributes } from '@tiptap/core';
import { AngularNodeViewRenderer } from 'ngx-tiptap';

import { NodeviewCounter } from './nodeviews/counter/counter';
import { NodeviewEditable } from './nodeviews/editable/editable';

export const CounterComponentExtension = (injector: Injector): Node => {
  return Node.create({
    name: 'angularCounterComponent',
    group: 'block',
    atom: true,
    draggable: true,

    addAttributes() {
      return {
        count: {
          default: 0,
        },
      };
    },

    parseHTML() {
      return [
        {
          tag: 'angular-component-counter',
        },
      ];
    },

    renderHTML({ HTMLAttributes }) {
      return ['angular-component-counter', mergeAttributes(HTMLAttributes)];
    },

    addNodeView() {
      return AngularNodeViewRenderer(NodeviewCounter, { injector });
    },
  });
};

export const EditableComponentExtension = (injector: Injector): Node => {
  return Node.create({
    name: 'angularEditableComponent',
    group: 'block',
    content: 'inline*',
    draggable: true,

    parseHTML() {
      return [{ tag: 'angular-component-editable' }];
    },

    renderHTML({ HTMLAttributes }) {
      return ['angular-component-editable', mergeAttributes(HTMLAttributes), 0];
    },

    addNodeView() {
      return AngularNodeViewRenderer(NodeviewEditable, { injector });
    },
  });
};
