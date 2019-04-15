import { TestBed } from '@angular/core/testing';

import { StudySubjectService } from './study-subject.service';

describe('StudySubjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudySubjectService = TestBed.get(StudySubjectService);
    expect(service).toBeTruthy();
  });
});
