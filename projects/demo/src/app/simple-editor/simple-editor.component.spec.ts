import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SimpleEditorComponent } from './simple-editor.component';

describe('SimpleEditorComponent', () => {
  let component: SimpleEditorComponent;
  let fixture: ComponentFixture<SimpleEditorComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        SimpleEditorComponent,
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

  // https://github.com/sibiraj-s/ngx-tiptap/issues/24
  it('should not call the handleValueChange function on render without any changes', async () => {
    spyOn(component, 'handleValueChange').and.callThrough();
    await fixture.whenStable();
    expect(component.handleValueChange).not.toHaveBeenCalled();
  });
});
