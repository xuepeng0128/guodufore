import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesCircleDetailComponent } from './classes-circle-detail.component';

describe('ClassesCircleDetailComponent', () => {
  let component: ClassesCircleDetailComponent;
  let fixture: ComponentFixture<ClassesCircleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesCircleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesCircleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
