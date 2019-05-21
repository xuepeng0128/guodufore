import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherHabitComponent } from './teacher-habit.component';

describe('TeacherHabitComponent', () => {
  let component: TeacherHabitComponent;
  let fixture: ComponentFixture<TeacherHabitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherHabitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherHabitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
