import { TestBed } from '@angular/core/testing';

import { SysParamsService } from './sys-params.service';

describe('SysParamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysParamsService = TestBed.get(SysParamsService);
    expect(service).toBeTruthy();
  });
});
