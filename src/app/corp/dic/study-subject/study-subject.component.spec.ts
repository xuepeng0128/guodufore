import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySubjectComponent } from './study-subject.component';

describe('StudySubjectComponent', () => {
  let component: StudySubjectComponent;
  let fixture: ComponentFixture<StudySubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudySubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudySubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
