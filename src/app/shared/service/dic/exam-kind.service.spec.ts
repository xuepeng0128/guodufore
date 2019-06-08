import { TestBed } from '@angular/core/testing';

import { ExamKindService } from './exam-kind.service';

describe('ExamKindService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamKindService = TestBed.get(ExamKindService);
    expect(service).toBeTruthy();
  });
});
