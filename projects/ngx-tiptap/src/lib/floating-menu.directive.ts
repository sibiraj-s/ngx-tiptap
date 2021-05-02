import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Editor } from '@tiptap/core';
import { FloatingMenuPlugin, FloatingMenuPluginKey, FloatingMenuPluginProps } from '@tiptap/extension-floating-menu'

@Directive({
  selector: 'tiptap-floting-menu, [tiptapFloatingMenu]'
})

export class FloatingMenuDirective implements OnInit, OnDestroy {
  @Input() editor: Editor;
  @Input() tippyOptions: FloatingMenuPluginProps['tippyOptions'] = {};

  constructor(private _el: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    this.editor.registerPlugin(FloatingMenuPlugin({
      editor: this.editor,
      element: this._el.nativeElement,
      tippyOptions: this.tippyOptions
    }))
  }

  ngOnDestroy(): void {
    this.editor.unregisterPlugin(FloatingMenuPluginKey)
  }
}
