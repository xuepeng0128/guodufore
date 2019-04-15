import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherChooseComponent } from './teacher-choose.component';

describe('TeacherChooseComponent', () => {
  let component: TeacherChooseComponent;
  let fixture: ComponentFixture<TeacherChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
