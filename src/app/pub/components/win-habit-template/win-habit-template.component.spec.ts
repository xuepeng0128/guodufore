import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinHabitTemplateComponent } from './win-habit-template.component';

describe('WinHabitTemplateComponent', () => {
  let component: WinHabitTemplateComponent;
  let fixture: ComponentFixture<WinHabitTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinHabitTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinHabitTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
