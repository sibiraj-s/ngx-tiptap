import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxTiptapModule } from 'ngx-tiptap';

import { AppComponent } from './app.component';
import { NodeviewCounterComponent } from './nodeviews/counter/counter.component';
import { NodeviewEditableComponent } from './nodeviews/editable/editable.component';

@NgModule({
  declarations: [
    AppComponent,
    NodeviewCounterComponent,
    NodeviewEditableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxTiptapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
