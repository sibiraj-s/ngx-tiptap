import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NgxTiptapModule } from 'ngx-tiptap';

import { SimpleEditorComponent } from './simple-editor.component';

describe('SimpleEditorComponent', () => {
  let component: SimpleEditorComponent;
  let fixture: ComponentFixture<SimpleEditorComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        SimpleEditorComponent,
      ],
      imports: [
        ReactiveFormsModule,
        NgxTiptapModule,
      ],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the editor', () => {
    expect(fixture.debugElement.query(By.css('.ProseMirror'))).toBeTruthy();
  });
});
