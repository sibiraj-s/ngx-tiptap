import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TitleStrategy } from '@angular/router';
import { NgxTiptapModule } from 'ngx-tiptap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CustomTitleStrategy } from './app-title-strategy';

import { NodeviewCounterComponent } from './nodeview-renderer/nodeviews/counter/counter.component';
import { NodeviewEditableComponent } from './nodeview-renderer/nodeviews/editable/editable.component';
import { SimpleEditorComponent } from './simple-editor/simple-editor.component';
import { SimpleEditorReactiveComponent } from './simple-editor-reactive/simple-editor-reactive.component';
import { FloatingMenuComponent } from './floating-menu/floating-menu.component';
import { BubbleMenuComponent } from './bubble-menu/bubble-menu.component';
import { NodeviewRendererComponent } from './nodeview-renderer/nodeview-renderer.component';

@NgModule({
  declarations: [
    AppComponent,

    NodeviewCounterComponent,
    NodeviewEditableComponent,

    SimpleEditorComponent,
    SimpleEditorReactiveComponent,
    FloatingMenuComponent,
    BubbleMenuComponent,
    NodeviewRendererComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxTiptapModule,
    AppRoutingModule,
  ],
  providers: [{
    provide: TitleStrategy,
    useClass: CustomTitleStrategy,
  }],
  bootstrap: [AppComponent],
})

export class AppModule { }
