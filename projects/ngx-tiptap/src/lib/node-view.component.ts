import { Component, input } from '@angular/core';
import type { NodeViewProps } from '@tiptap/core';

type Inputs = 'editor' | 'node' | 'decorations' | 'innerDecorations' | 'view' | 'selected' | 'extension' | 'HTMLAttributes' | 'getPos' | 'updateAttributes' | 'deleteNode';
type NodeViewPropsWithoutInputs = Omit<NodeViewProps, Inputs>;

@Component({
  template: '',
})
export class AngularNodeViewComponent implements NodeViewPropsWithoutInputs {
  readonly editor = input.required<NodeViewProps['editor']>();
  readonly node = input.required<NodeViewProps['node']>();
  readonly decorations = input.required<NodeViewProps['decorations']>();
  readonly innerDecorations = input.required<NodeViewProps['innerDecorations']>();
  readonly view = input.required<NodeViewProps['view']>();
  readonly selected = input.required<NodeViewProps['selected']>();
  readonly extension = input.required<NodeViewProps['extension']>();
  readonly HTMLAttributes = input.required<NodeViewProps['HTMLAttributes']>();
  readonly getPos = input.required<NodeViewProps['getPos']>();
  readonly updateAttributes = input.required<NodeViewProps['updateAttributes']>();
  readonly deleteNode = input.required<NodeViewProps['deleteNode']>();
}
