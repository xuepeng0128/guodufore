import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinExamHabitComponent } from './win-exam-habit.component';

describe('WinExamHabitComponent', () => {
  let component: WinExamHabitComponent;
  let fixture: ComponentFixture<WinExamHabitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinExamHabitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinExamHabitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
