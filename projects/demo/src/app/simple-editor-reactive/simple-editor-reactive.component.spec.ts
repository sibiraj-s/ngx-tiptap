import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SimpleEditorReactiveComponent } from './simple-editor-reactive.component';

describe('SimpleEditorReactiveComponent', () => {
  let component: SimpleEditorReactiveComponent;
  let fixture: ComponentFixture<SimpleEditorReactiveComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        SimpleEditorReactiveComponent,
      ],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleEditorReactiveComponent);
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
