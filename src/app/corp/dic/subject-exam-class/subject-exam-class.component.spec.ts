import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectExamClassComponent } from './subject-exam-class.component';

describe('SubjectExamClassComponent', () => {
  let component: SubjectExamClassComponent;
  let fixture: ComponentFixture<SubjectExamClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectExamClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectExamClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
