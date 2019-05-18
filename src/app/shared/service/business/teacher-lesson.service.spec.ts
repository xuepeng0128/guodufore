import { TestBed } from '@angular/core/testing';

import { TeacherLessonService } from './teacher-lesson.service';

describe('TeacherLessonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeacherLessonService = TestBed.get(TeacherLessonService);
    expect(service).toBeTruthy();
  });
});
