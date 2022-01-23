import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NgxTiptapModule } from 'ngx-tiptap';

import { NodeviewRendererComponent } from './nodeview-renderer.component';

describe('NodeviewRendererComponent', () => {
  let component: NodeviewRendererComponent;
  let fixture: ComponentFixture<NodeviewRendererComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        NodeviewRendererComponent
      ],
      imports: [
        FormsModule,
        NgxTiptapModule
      ]
    })

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
