import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Editor } from '@tiptap/core';
import { BubbleMenuPlugin, BubbleMenuPluginKey, BubbleMenuPluginProps } from '@tiptap/extension-bubble-menu'

@Directive({
  selector: 'tiptap-bubble-menu, [tiptapBubbleMenu]'
})
export class BubbleMenuDirective implements OnInit, OnDestroy {
  @Input() editor: Editor;
  @Input() tippyOptions: BubbleMenuPluginProps['tippyOptions'] = {};

  constructor(private _el: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    this.editor.registerPlugin(BubbleMenuPlugin({
      editor: this.editor,
      element: this._el.nativeElement,
      tippyOptions: this.tippyOptions
    }))
  }

  ngOnDestroy(): void {
    this.editor.unregisterPlugin(BubbleMenuPluginKey)
  }
}
