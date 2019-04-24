import { TestBed } from '@angular/core/testing';

import { CircleClassService } from './circle-class.service';

describe('CircleClassService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CircleClassService = TestBed.get(CircleClassService);
    expect(service).toBeTruthy();
  });
});
