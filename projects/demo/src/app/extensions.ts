import { Injector } from '@angular/core'
import { Node, mergeAttributes } from '@tiptap/core'
import { AngularNodeViewRenderer } from 'ngx-tiptap'

import { NodeviewCounterComponent } from './nodeviews/counter/counter.component'
import { NodeviewEditableComponent } from './nodeviews/editable/editable.component'

export const AngularComponent = (injector: Injector): Node => {
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
      }
    },

    parseHTML() {
      return [
        {
          tag: 'angular-component-counter',
        },
      ]
    },

    renderHTML({ HTMLAttributes }) {
      return ['angular-component-counter', mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
      return AngularNodeViewRenderer(NodeviewCounterComponent, { injector })
    },
  })
}

export const AngularEditableComponent = (injector: Injector): Node => {
  return Node.create({
    name: 'angularEditableComponent',
    group: 'block',
    content: 'inline*',

    addAttributes() {
      return {
        count: {
          default: 0,
        },
      }
    },

    parseHTML() {
      return [
        {
          tag: 'angular-component-editable',
        },
      ]
    },

    renderHTML({ HTMLAttributes }) {
      return ['angular-component-editable', mergeAttributes(HTMLAttributes), 0]
    },

    addNodeView() {
      return AngularNodeViewRenderer(NodeviewEditableComponent, { injector })
    },
  })
}
