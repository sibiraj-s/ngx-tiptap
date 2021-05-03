import { Injector } from '@angular/core'
import { Node, mergeAttributes } from '@tiptap/core'
import { AngularNodeViewRenderer } from 'ngx-tiptap'

import { NodeviewCounterComponent } from './nodeview-counter/nodeview-counter.component'

export default (injector: Injector): Node => {
  return Node.create({
    name: 'angularCounterComponent',
    group: 'block',
    atom: true,

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
      return AngularNodeViewRenderer(NodeviewCounterComponent, injector)
    },
  })
}
