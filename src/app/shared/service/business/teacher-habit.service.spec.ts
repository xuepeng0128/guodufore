import { TestBed } from '@angular/core/testing';

import { TeacherHabitService } from './teacher-habit.service';

describe('TeacherHabitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeacherHabitService = TestBed.get(TeacherHabitService);
    expect(service).toBeTruthy();
  });
});
