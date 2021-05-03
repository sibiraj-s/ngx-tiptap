import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeviewEditableComponent } from './nodeview-editable.component';

describe('NodeviewEditableComponent', () => {
  let component: NodeviewEditableComponent;
  let fixture: ComponentFixture<NodeviewEditableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeviewEditableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeviewEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
