import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitClassComponent } from './habit-class.component';

describe('HabitClassComponent', () => {
  let component: HabitClassComponent;
  let fixture: ComponentFixture<HabitClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
