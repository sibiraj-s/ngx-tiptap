import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxTiptapModule } from 'ngx-tiptap';

import { AppComponent } from './app.component';
import { NodeviewCounterComponent } from './nodeview-counter/nodeview-counter.component';
import { NodeviewEditableComponent } from './nodeview-editable/nodeview-editable.component';

@NgModule({
  declarations: [
    AppComponent,
    NodeviewCounterComponent,
    NodeviewEditableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxTiptapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
