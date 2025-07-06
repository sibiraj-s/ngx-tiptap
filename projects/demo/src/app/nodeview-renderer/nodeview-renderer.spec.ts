import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NodeviewRenderer } from './nodeview-renderer';

describe('NodeviewRendererComponent', () => {
  let component: NodeviewRenderer;
  let fixture: ComponentFixture<NodeviewRenderer>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        NodeviewRenderer,
      ],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeviewRenderer);
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
