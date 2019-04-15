import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumMgrComponent } from './curriculum-mgr.component';

describe('CurriculumMgrComponent', () => {
  let component: CurriculumMgrComponent;
  let fixture: ComponentFixture<CurriculumMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumMgrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
