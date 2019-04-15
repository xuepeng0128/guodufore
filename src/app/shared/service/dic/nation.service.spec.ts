import { TestBed } from '@angular/core/testing';

import { NationService } from './nation.service';

describe('NationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NationService = TestBed.get(NationService);
    expect(service).toBeTruthy();
  });
});
