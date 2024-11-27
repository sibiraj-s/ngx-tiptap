import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TiptapNodeViewContentDirective } from './node-view-content.directive';

@Component({
  template: '<div tiptapNodeViewContent>Hello Tiptap!</div>',
  imports: [TiptapNodeViewContentDirective],
  standalone: true,
})

class TestComponent { }

describe('NodeViewContentDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [TestComponent,
        TiptapNodeViewContentDirective],
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(TestComponent);

    fixture.detectChanges();
  });

  it('should add the attributes correctly', () => {
    expect(fixture.debugElement.query(By.css('[data-node-view-content]'))).toBeTruthy();
  });
});
