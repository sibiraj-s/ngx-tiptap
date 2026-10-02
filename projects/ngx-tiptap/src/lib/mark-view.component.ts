import { Component, input } from '@angular/core';
import type { MarkViewProps } from '@tiptap/core';

type Inputs =
  | 'editor'
  | 'mark'
  | 'view'
  | 'inline'
  | 'extension'
  | 'HTMLAttributes'
  | 'updateAttributes';
type MarkViewPropsWithoutInputs = Omit<MarkViewProps, Inputs>;

@Component({
  template: '',
})
export class AngularMarkViewComponent implements MarkViewPropsWithoutInputs {
  readonly editor = input.required<MarkViewProps['editor']>();
  readonly mark = input.required<MarkViewProps['mark']>();
  readonly view = input.required<MarkViewProps['view']>();
  readonly inline = input.required<MarkViewProps['inline']>();
  readonly extension = input.required<MarkViewProps['extension']>();
  readonly HTMLAttributes = input.required<MarkViewProps['HTMLAttributes']>();
  readonly updateAttributes = input.required<MarkViewProps['updateAttributes']>();
}
