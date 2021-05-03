import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { Editor } from '@tiptap/core';
import { defaultExtensions } from '@tiptap/starter-kit';
import { By } from '@angular/platform-browser';

import { NgxTiptapModule } from 'ngx-tiptap';
import { CommonModule } from '@angular/common';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let app: AppComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        CommonModule,
        FormsModule,
        NgxTiptapModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  beforeEach(() => {
    app.editor = new Editor({
      extensions: defaultExtensions()
    })

    fixture.detectChanges()
  })

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should render the editor`, () => {
    expect(fixture.debugElement.query(By.css('.ProseMirror'))).toBeTruthy()
  });
});
