import { TestBed } from '@angular/core/testing';

import { HabitTemplateService } from './habit-template.service';

describe('HabitTemplateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HabitTemplateService = TestBed.get(HabitTemplateService);
    expect(service).toBeTruthy();
  });
});
