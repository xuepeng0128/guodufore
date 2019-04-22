import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherWritingComponent } from './teacher-writing.component';

describe('TeacherWritingComponent', () => {
  let component: TeacherWritingComponent;
  let fixture: ComponentFixture<TeacherWritingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherWritingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherWritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
