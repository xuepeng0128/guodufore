import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolManagerHabitComponent } from './school-manager-habit.component';

describe('SchoolManagerHabitComponent', () => {
  let component: SchoolManagerHabitComponent;
  let fixture: ComponentFixture<SchoolManagerHabitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolManagerHabitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolManagerHabitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
