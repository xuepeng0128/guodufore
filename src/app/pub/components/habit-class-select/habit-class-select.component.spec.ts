import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitClassSelectComponent } from './habit-class-select.component';

describe('HabitClassSelectComponent', () => {
  let component: HabitClassSelectComponent;
  let fixture: ComponentFixture<HabitClassSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitClassSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitClassSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
