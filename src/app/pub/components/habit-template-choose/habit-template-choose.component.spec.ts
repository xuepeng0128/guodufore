import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitTemplateChooseComponent } from './habit-template-choose.component';

describe('HabitTemplateChooseComponent', () => {
  let component: HabitTemplateChooseComponent;
  let fixture: ComponentFixture<HabitTemplateChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitTemplateChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitTemplateChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
