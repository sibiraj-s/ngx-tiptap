import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BubbleMenuComponent } from './bubble-menu.component';

describe('BubbleMenuComponent', () => {
  let component: BubbleMenuComponent;
  let fixture: ComponentFixture<BubbleMenuComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        BubbleMenuComponent,
      ],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleMenuComponent);
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
