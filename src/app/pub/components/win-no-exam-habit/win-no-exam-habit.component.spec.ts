import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinNoExamHabitComponent } from './win-no-exam-habit.component';

describe('WinNoExamHabitComponent', () => {
  let component: WinNoExamHabitComponent;
  let fixture: ComponentFixture<WinNoExamHabitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinNoExamHabitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinNoExamHabitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
