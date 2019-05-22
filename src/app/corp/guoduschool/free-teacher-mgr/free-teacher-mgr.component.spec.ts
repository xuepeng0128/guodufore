import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeTeacherMgrComponent } from './free-teacher-mgr.component';

describe('FreeTeacherMgrComponent', () => {
  let component: FreeTeacherMgrComponent;
  let fixture: ComponentFixture<FreeTeacherMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeTeacherMgrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeTeacherMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
