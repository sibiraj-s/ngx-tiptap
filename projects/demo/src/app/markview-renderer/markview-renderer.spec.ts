import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MarkviewRenderer } from './markview-renderer';

describe('MarkviewRendererComponent', () => {
  let component: MarkviewRenderer;
  let fixture: ComponentFixture<MarkviewRenderer>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        MarkviewRenderer,
      ],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkviewRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the editor', () => {
    expect(fixture.debugElement.query(By.css('.ProseMirror'))).toBeTruthy();
  });

  it('should render the marks with the component', () => {
    expect(fixture.debugElement.queryAll(By.css('app-markview-highlight'))).toHaveLength(2);
  });
});
