import { Component, input, signal } from '@angular/core';

import { AngularWidgetComponent } from 'ngx-tiptap';

@Component({
  selector: 'app-widget-word-count',
  templateUrl: './word-count.component.html',
  styleUrls: ['./word-count.css'],
})
export class WidgetWordCount extends AngularWidgetComponent {
  readonly words = input(0);
  readonly characters = input(0);

  readonly showCharacters = signal(false);

  toggle(): void {
    this.showCharacters.update((value) => !value);
  }
}
