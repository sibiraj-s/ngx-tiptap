import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { WidgetRenderer } from './widget-renderer';

describe('WidgetRendererComponent', () => {
  let component: WidgetRenderer;
  let fixture: ComponentFixture<WidgetRenderer>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        WidgetRenderer,
      ],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the editor', () => {
    expect(fixture.debugElement.query(By.css('.ProseMirror'))).toBeTruthy();
  });

  it('should render the widget with the component', () => {
    const widget = fixture.debugElement.query(By.css('app-widget-word-count'));

    expect(widget.nativeElement.textContent.trim()).toBe('34 words');
  });
});
