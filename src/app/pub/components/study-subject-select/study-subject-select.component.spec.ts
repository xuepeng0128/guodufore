import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySubjectSelectComponent } from './study-subject-select.component';

describe('StudySubjectSelectComponent', () => {
  let component: StudySubjectSelectComponent;
  let fixture: ComponentFixture<StudySubjectSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudySubjectSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudySubjectSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
