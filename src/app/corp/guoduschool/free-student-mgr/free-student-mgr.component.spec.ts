import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeStudentMgrComponent } from './free-student-mgr.component';

describe('FreeStudentMgrComponent', () => {
  let component: FreeStudentMgrComponent;
  let fixture: ComponentFixture<FreeStudentMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeStudentMgrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeStudentMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
