import { TestBed } from '@angular/core/testing';

import { SubjectExamClassService } from './subject-exam-class.service';

describe('SubjectExamClassService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubjectExamClassService = TestBed.get(SubjectExamClassService);
    expect(service).toBeTruthy();
  });
});
