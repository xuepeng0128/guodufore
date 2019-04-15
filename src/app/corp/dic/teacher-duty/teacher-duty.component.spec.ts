import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDutyComponent } from './teacher-duty.component';

describe('TeacherDutyComponent', () => {
  let component: TeacherDutyComponent;
  let fixture: ComponentFixture<TeacherDutyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherDutyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
