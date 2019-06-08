import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamMgrDetailComponent } from './exam-mgr-detail.component';

describe('ExamMgrDetailComponent', () => {
  let component: ExamMgrDetailComponent;
  let fixture: ComponentFixture<ExamMgrDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamMgrDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamMgrDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
