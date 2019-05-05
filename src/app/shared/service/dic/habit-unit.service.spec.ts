import { TestBed } from '@angular/core/testing';

import { HabitUnitService } from './habit-unit.service';

describe('HabitUnitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HabitUnitService = TestBed.get(HabitUnitService);
    expect(service).toBeTruthy();
  });
});
