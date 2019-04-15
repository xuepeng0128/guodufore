import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitTemplateComponent } from './habit-template.component';

describe('HabitTemplateComponent', () => {
  let component: HabitTemplateComponent;
  let fixture: ComponentFixture<HabitTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
