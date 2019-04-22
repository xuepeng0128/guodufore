import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamMgrComponent } from './exam-mgr.component';

describe('ExamMgrComponent', () => {
  let component: ExamMgrComponent;
  let fixture: ComponentFixture<ExamMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamMgrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
