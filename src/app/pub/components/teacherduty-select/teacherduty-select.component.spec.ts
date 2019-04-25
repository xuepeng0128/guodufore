import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherdutySelectComponent } from './teacherduty-select.component';

describe('TeacherdutySelectComponent', () => {
  let component: TeacherdutySelectComponent;
  let fixture: ComponentFixture<TeacherdutySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherdutySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherdutySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
