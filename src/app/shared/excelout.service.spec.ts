import { TestBed } from '@angular/core/testing';

import { ExceloutService } from './excelout.service';

describe('ExceloutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExceloutService = TestBed.get(ExceloutService);
    expect(service).toBeTruthy();
  });
});
