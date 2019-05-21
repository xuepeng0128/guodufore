import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleStudentChooseComponent } from './circle-student-choose.component';

describe('CircleStudentChooseComponent', () => {
  let component: CircleStudentChooseComponent;
  let fixture: ComponentFixture<CircleStudentChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircleStudentChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleStudentChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
