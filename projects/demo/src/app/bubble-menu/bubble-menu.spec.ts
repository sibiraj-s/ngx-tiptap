import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BubbleMenu } from './bubble-menu';

describe('BubbleMenuComponent', () => {
  let component: BubbleMenu;
  let fixture: ComponentFixture<BubbleMenu>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        BubbleMenu,
      ],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleMenu);
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
