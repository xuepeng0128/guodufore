import { TestBed } from '@angular/core/testing';

import { HabitClassService } from './habit-class.service';

describe('HabitClassService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HabitClassService = TestBed.get(HabitClassService);
    expect(service).toBeTruthy();
  });
});
