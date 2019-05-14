import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinStudentComponent } from './win-student.component';

describe('WinStudentComponent', () => {
  let component: WinStudentComponent;
  let fixture: ComponentFixture<WinStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
