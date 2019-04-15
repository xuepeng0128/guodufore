import { TestBed } from '@angular/core/testing';

import { CorpdutyService } from './corpduty.service';

describe('CorpdutyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CorpdutyService = TestBed.get(CorpdutyService);
    expect(service).toBeTruthy();
  });
});
