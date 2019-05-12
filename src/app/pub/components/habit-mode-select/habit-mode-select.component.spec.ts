import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitModeSelectComponent } from './habit-mode-select.component';

describe('HabitModeSelectComponent', () => {
  let component: HabitModeSelectComponent;
  let fixture: ComponentFixture<HabitModeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitModeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitModeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
