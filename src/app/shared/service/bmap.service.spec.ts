import { TestBed } from '@angular/core/testing';

import { BMapService } from './bmap.service';

describe('BMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BMapService = TestBed.get(BMapService);
    expect(service).toBeTruthy();
  });
});
