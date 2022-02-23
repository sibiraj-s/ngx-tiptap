import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NgxTiptapModule } from 'ngx-tiptap';

import { BubbleMenuComponent } from './bubble-menu.component';

describe('BubbleMenuComponent', () => {
  let component: BubbleMenuComponent;
  let fixture: ComponentFixture<BubbleMenuComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        BubbleMenuComponent,
      ],
      imports: [
        FormsModule,
        NgxTiptapModule,
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
