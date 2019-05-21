import { TestBed } from '@angular/core/testing';

import { HabitService } from './habit.service';

describe('HabitTemplateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HabitService = TestBed.get(HabitService);
    expect(service).toBeTruthy();
  });
});
