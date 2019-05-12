import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitTimeUnitSelectComponent } from './habit-time-unit-select.component';

describe('HabitTimeUnitSelectComponent', () => {
  let component: HabitTimeUnitSelectComponent;
  let fixture: ComponentFixture<HabitTimeUnitSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitTimeUnitSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitTimeUnitSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
