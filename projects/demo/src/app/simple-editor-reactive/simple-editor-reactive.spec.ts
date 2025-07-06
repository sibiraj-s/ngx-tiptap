import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SimpleEditorReactive } from './simple-editor-reactive';

describe('SimpleEditorReactiveComponent', () => {
  let component: SimpleEditorReactive;
  let fixture: ComponentFixture<SimpleEditorReactive>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        SimpleEditorReactive,
      ],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleEditorReactive);
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
