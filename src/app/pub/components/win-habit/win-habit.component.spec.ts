import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinHabitComponent } from './win-habit.component';

describe('WinHabitComponent', () => {
  let component: WinHabitComponent;
  let fixture: ComponentFixture<WinHabitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinHabitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinHabitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
