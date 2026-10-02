import {
  Directive, ElementRef, OnDestroy,
  OnInit, inject, input,
} from '@angular/core';
import { Editor } from '@tiptap/core';
import { BubbleMenuPlugin, BubbleMenuPluginProps } from '@tiptap/extension-bubble-menu';

@Directive({
  selector: 'tiptap-bubble-menu[editor], [tiptapBubbleMenu][editor]',
})
export class TiptapBubbleMenuDirective implements OnInit, OnDestroy {
  private elRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly editor = input.required<Editor>();
  readonly pluginKey = input<BubbleMenuPluginProps['pluginKey']>('NgxTiptapBubbleMenu');
  readonly options = input<BubbleMenuPluginProps['options']>({});
  readonly shouldShow = input<BubbleMenuPluginProps['shouldShow']>(null);
  readonly updateDelay = input<BubbleMenuPluginProps['updateDelay']>();
  readonly resizeDelay = input<BubbleMenuPluginProps['resizeDelay']>();
  readonly appendTo = input<BubbleMenuPluginProps['appendTo']>(null);
  readonly virtualElement = input<BubbleMenuPluginProps['getReferencedVirtualElement']>(null);

  ngOnInit(): void {
    const editor = this.editor();
    if (!editor) {
      throw new Error('Required: Input `editor`');
    }

    const bubbleMenuElement = this.elRef.nativeElement;
    bubbleMenuElement.style.visibility = 'hidden';
    bubbleMenuElement.style.position = 'absolute';

    editor.registerPlugin(BubbleMenuPlugin({
      pluginKey: this.pluginKey(),
      editor,
      element: bubbleMenuElement,
      options: this.options(),
      shouldShow: this.shouldShow(),
      updateDelay: this.updateDelay(),
      appendTo: this.appendTo(),
      getReferencedVirtualElement: this.virtualElement(),
      resizeDelay: this.resizeDelay()
    }));
  }

  ngOnDestroy(): void {
    this.editor().unregisterPlugin(this.pluginKey());
    window.requestAnimationFrame(() => {
      if (this.elRef.nativeElement.parentNode) {
        this.elRef.nativeElement.parentNode.removeChild(this.elRef.nativeElement);
      }
    });
  }
}
