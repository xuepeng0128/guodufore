import { TestBed } from '@angular/core/testing';

import { TeacherNoticeService } from './teacher-notice.service';

describe('TeacherNoticeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeacherNoticeService = TestBed.get(TeacherNoticeService);
    expect(service).toBeTruthy();
  });
});
