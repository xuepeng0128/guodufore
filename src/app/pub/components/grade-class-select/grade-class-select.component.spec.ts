import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeClassSelectComponent } from './grade-class-select.component';

describe('GradeClassSelectComponent', () => {
  let component: GradeClassSelectComponent;
  let fixture: ComponentFixture<GradeClassSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeClassSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeClassSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
