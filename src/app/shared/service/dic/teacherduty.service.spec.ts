import { TestBed } from '@angular/core/testing';

import { TeacherdutyService } from './teacherduty.service';

describe('TeacherdutyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeacherdutyService = TestBed.get(TeacherdutyService);
    expect(service).toBeTruthy();
  });
});
