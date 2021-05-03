import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeviewCounterComponent } from './nodeview-counter.component';

describe('NodeviewCounterComponent', () => {
  let component: NodeviewCounterComponent;
  let fixture: ComponentFixture<NodeviewCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeviewCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeviewCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
