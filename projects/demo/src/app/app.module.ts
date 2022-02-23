import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxTiptapModule } from 'ngx-tiptap';

import { AppComponent } from './app.component';
import { NodeviewCounterComponent } from './nodeview-renderer/nodeviews/counter/counter.component';
import { NodeviewEditableComponent } from './nodeview-renderer/nodeviews/editable/editable.component';
import { SimpleEditorComponent } from './simple-editor/simple-editor.component';
import { FloatingMenuComponent } from './floating-menu/floating-menu.component';
import { BubbleMenuComponent } from './bubble-menu/bubble-menu.component';
import { NodeviewRendererComponent } from './nodeview-renderer/nodeview-renderer.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,

    NodeviewCounterComponent,
    NodeviewEditableComponent,

    SimpleEditorComponent,
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
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule { }
