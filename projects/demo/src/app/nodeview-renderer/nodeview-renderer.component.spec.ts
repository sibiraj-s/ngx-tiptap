import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NodeviewRendererComponent } from './nodeview-renderer.component';

describe('NodeviewRendererComponent', () => {
  let component: NodeviewRendererComponent;
  let fixture: ComponentFixture<NodeviewRendererComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        NodeviewRendererComponent,
      ],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeviewRendererComponent);
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
