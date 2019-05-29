import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherLessonsDetailComponent } from './teacher-lessons-detail.component';

describe('TeacherLessonsDetailComponent', () => {
  let component: TeacherLessonsDetailComponent;
  let fixture: ComponentFixture<TeacherLessonsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherLessonsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherLessonsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
