import {
  Directive, ElementRef, Input, OnDestroy, OnInit, inject,
} from '@angular/core';
import { Editor } from '@tiptap/core';
import { BubbleMenuPlugin, BubbleMenuPluginProps } from '@tiptap/extension-bubble-menu';

@Directive({
  selector: 'tiptap-bubble-menu[editor], [tiptapBubbleMenu][editor]',
  standalone: true,
})
export class TiptapBubbleMenuDirective implements OnInit, OnDestroy {
  private elRef = inject<ElementRef<HTMLElement>>(ElementRef);

  @Input() pluginKey: BubbleMenuPluginProps['pluginKey'] = 'NgxTiptapBubbleMenu';
  @Input() editor!: Editor;
  @Input() tippyOptions: BubbleMenuPluginProps['tippyOptions'] = {};
  @Input() shouldShow: BubbleMenuPluginProps['shouldShow'] = null;
  @Input() updateDelay: BubbleMenuPluginProps['updateDelay'];

  ngOnInit(): void {
    if (!this.editor) {
      throw new Error('Required: Input `editor`');
    }

    this.editor.registerPlugin(BubbleMenuPlugin({
      pluginKey: this.pluginKey,
      editor: this.editor,
      element: this.elRef.nativeElement,
      tippyOptions: this.tippyOptions,
      shouldShow: this.shouldShow,
      updateDelay: this.updateDelay,
    }));
  }

  ngOnDestroy(): void {
    this.editor.unregisterPlugin(this.pluginKey);
  }
}
