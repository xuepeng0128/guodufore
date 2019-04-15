import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMgrComponent } from './school-admin-mgr.component';

describe('SchoolAdminMgrComponent', () => {
  let component: SchoolAdminMgrComponent;
  let fixture: ComponentFixture<SchoolAdminMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMgrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
