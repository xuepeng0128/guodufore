import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesCircleComponent } from './classes-circle.component';

describe('ClassesCircleComponent', () => {
  let component: ClassesCircleComponent;
  let fixture: ComponentFixture<ClassesCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
