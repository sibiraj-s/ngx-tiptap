import { Injector, Type } from '@angular/core';
import {
  Editor, WidgetDecoration, WidgetDecorationOptions, createWidgetDecoration,
} from '@tiptap/core';

import { AngularRenderer, AngularRendererProps } from './AngularRenderer';
import { AngularWidgetComponent } from './widget.component';

type WidgetProps<C> = Partial<AngularRendererProps<Omit<C, keyof AngularWidgetComponent>>>;

export interface AngularWidgetRendererOptions<C extends AngularWidgetComponent = AngularWidgetComponent>
  extends WidgetDecorationOptions {
  /**
   * The editor instance.
   */
  editor: Editor;
  /**
   * The document position the widget is rendered at.
   */
  pos: number;
  /**
   * A stable, position-independent identifier for the widget.
   * Reusing the same key keeps the component mounted across re-renders.
   * Good: `comment-${id}`. Bad: paragraph index or document position.
   */
  key: string;
  injector: Injector;
  /**
   * Inputs set on the component, in addition to `editor` and `getPos`.
   */
  props?: WidgetProps<C>;
  /**
   * Applied only when the component is first created; later renders with the
   * same `key` keep the original class.
   */
  className?: string;
}

const WIDGET_CACHE = Symbol('tiptapAngularWidgetCache');

/**
 * Renders an Angular component into a ProseMirror widget decoration.
 * Use a stable `key` for stateful widgets.
 * @example
 * addDecorations() {
 *   return {
 *     create: ({ editor, state }) =>
 *       findMatches(state.doc).map(match =>
 *         AngularWidgetRenderer(MyWidgetComponent, {
 *           editor, injector, pos: match.pos, key: `match-${match.id}`,
 *           props: { label: match.label },
 *         }),
 *       ),
 *   }
 * }
 */
export const AngularWidgetRenderer = <C extends AngularWidgetComponent>(
  component: Type<C>,
  options: AngularWidgetRendererOptions<C>,
): WidgetDecoration => {
  const {
    editor, injector, props = {}, className,
  } = options;

  return createWidgetDecoration<AngularRenderer<C, Record<string, unknown>>>({
    // Forwards editor, pos, key and the ProseMirror widget options unchanged.
    ...options,
    props,
    cacheKey: WIDGET_CACHE,
    context: (getPos) => ({ editor, getPos }),
    create: (renderProps) => {
      const renderer = new AngularRenderer<C, Record<string, unknown>>(component, injector, renderProps);

      if (className) {
        renderer.dom.classList.add(...className.split(/\s+/).filter(Boolean));
      }

      return renderer;
    },
    materialize: (renderer) => {
      // render the latest props before ProseMirror inserts the element
      renderer.detectChanges();

      return renderer.dom;
    },
  });
};
