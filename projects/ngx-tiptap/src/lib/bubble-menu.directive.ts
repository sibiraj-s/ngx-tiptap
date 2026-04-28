import {
  Directive, ElementRef, OnDestroy,
  OnInit, Renderer2, inject, input,
} from '@angular/core';
import { Editor } from '@tiptap/core';
import { BubbleMenuPlugin, BubbleMenuPluginProps } from '@tiptap/extension-bubble-menu';

@Directive({
  selector: 'tiptap-bubble-menu[editor], [tiptapBubbleMenu][editor]',
})
export class TiptapBubbleMenuDirective implements OnInit, OnDestroy {
  private elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private renderer = inject(Renderer2);

  readonly editor = input.required<Editor>();
  readonly pluginKey = input<BubbleMenuPluginProps['pluginKey']>('NgxTiptapBubbleMenu');
  readonly options = input<BubbleMenuPluginProps['options']>({});
  readonly shouldShow = input<BubbleMenuPluginProps['shouldShow']>(null);
  readonly updateDelay = input<BubbleMenuPluginProps['updateDelay']>();

  ngOnInit(): void {
    const editor = this.editor();

    const bubbleMenuElement = this.elRef.nativeElement;
    this.renderer.setStyle(bubbleMenuElement, 'visibility', 'hidden');
    this.renderer.setStyle(bubbleMenuElement, 'position', 'absolute');

    editor.registerPlugin(BubbleMenuPlugin({
      pluginKey: this.pluginKey(),
      editor,
      element: bubbleMenuElement,
      options: this.options(),
      shouldShow: this.shouldShow(),
      updateDelay: this.updateDelay(),
    }));
  }

  ngOnDestroy(): void {
    this.editor().unregisterPlugin(this.pluginKey());
    window.requestAnimationFrame(() => {
      this.elRef.nativeElement.remove();
    });
  }
}
