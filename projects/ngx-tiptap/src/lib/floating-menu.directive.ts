import {
  Directive, ElementRef, Input, OnDestroy, OnInit, inject,
} from '@angular/core';
import { Editor } from '@tiptap/core';
import { FloatingMenuPlugin, FloatingMenuPluginProps } from '@tiptap/extension-floating-menu';

@Directive({
  selector: 'tiptap-floating-menu[editor], [tiptapFloatingMenu][editor]',
  standalone: true,
})

export class TiptapFloatingMenuDirective implements OnInit, OnDestroy {
  private elRef = inject<ElementRef<HTMLElement>>(ElementRef);

  @Input() pluginKey: FloatingMenuPluginProps['pluginKey'] = 'NgxTiptapFloatingMenu';
  @Input() editor!: Editor;
  @Input() tippyOptions: FloatingMenuPluginProps['tippyOptions'] = {};
  @Input() shouldShow: FloatingMenuPluginProps['shouldShow'] = null;

  ngOnInit(): void {
    if (!this.editor) {
      throw new Error('Required: Input `editor`');
    }

    this.editor.registerPlugin(FloatingMenuPlugin({
      pluginKey: this.pluginKey,
      editor: this.editor,
      element: this.elRef.nativeElement,
      tippyOptions: this.tippyOptions,
      shouldShow: this.shouldShow,
    }));
  }

  ngOnDestroy(): void {
    this.editor.unregisterPlugin(this.pluginKey);
  }
}
