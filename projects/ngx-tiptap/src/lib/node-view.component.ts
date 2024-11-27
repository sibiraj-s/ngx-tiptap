import { Component, Input } from '@angular/core';
import type { NodeViewProps } from '@tiptap/core';

@Component({
  template: '',
  standalone: false,
})
export class AngularNodeViewComponent implements NodeViewProps {
  @Input() editor!: NodeViewProps['editor'];
  @Input() node!: NodeViewProps['node'];
  @Input() decorations!: NodeViewProps['decorations'];
  @Input() innerDecorations!: NodeViewProps['innerDecorations'];
  @Input() view!: NodeViewProps['view'];
  @Input() selected!: NodeViewProps['selected'];
  @Input() extension!: NodeViewProps['extension'];
  @Input() HTMLAttributes!: NodeViewProps['HTMLAttributes'];
  @Input() getPos!: NodeViewProps['getPos'];
  @Input() updateAttributes!: NodeViewProps['updateAttributes'];
  @Input() deleteNode!: NodeViewProps['deleteNode'];
}
