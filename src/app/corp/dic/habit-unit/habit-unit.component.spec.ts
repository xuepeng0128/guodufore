import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitUnitComponent } from './habit-unit.component';

describe('HabitUnitComponent', () => {
  let component: HabitUnitComponent;
  let fixture: ComponentFixture<HabitUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
