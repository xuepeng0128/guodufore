import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitChooseComponent } from './habit-choose.component';

describe('HabitChooseComponent', () => {
  let component: HabitChooseComponent;
  let fixture: ComponentFixture<HabitChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
