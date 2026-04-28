import {
  Directive, ElementRef, OnDestroy, OnInit, Renderer2, inject,
  input,
} from '@angular/core';
import { Editor } from '@tiptap/core';
import { FloatingMenuPlugin, FloatingMenuPluginProps } from '@tiptap/extension-floating-menu';

@Directive({
  selector: 'tiptap-floating-menu[editor], [tiptapFloatingMenu][editor]',
})

export class TiptapFloatingMenuDirective implements OnInit, OnDestroy {
  private elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private renderer = inject(Renderer2);

  readonly pluginKey = input<FloatingMenuPluginProps['pluginKey']>('NgxTiptapFloatingMenu');
  readonly editor = input.required<Editor>();
  readonly options = input<FloatingMenuPluginProps['options']>({});
  readonly shouldShow = input<FloatingMenuPluginProps['shouldShow']>(null);

  ngOnInit(): void {
    const editor = this.editor();

    const floatingMenuElement = this.elRef.nativeElement;
    this.renderer.setStyle(floatingMenuElement, 'visibility', 'hidden');
    this.renderer.setStyle(floatingMenuElement, 'position', 'absolute');

    editor.registerPlugin(FloatingMenuPlugin({
      pluginKey: this.pluginKey(),
      editor,
      element: floatingMenuElement,
      options: this.options(),
      shouldShow: this.shouldShow(),
    }));
  }

  ngOnDestroy(): void {
    this.editor().unregisterPlugin(this.pluginKey());
    window.requestAnimationFrame(() => {
      this.elRef.nativeElement.remove();
    });
  }
}
