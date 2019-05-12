import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitUnitSelectComponent } from './habit-unit-select.component';

describe('HabitUnitSelectComponent', () => {
  let component: HabitUnitSelectComponent;
  let fixture: ComponentFixture<HabitUnitSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitUnitSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitUnitSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
