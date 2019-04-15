import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainSchoolAdminComponent } from './train-school-admin.component';

describe('TrainSchoolAdminComponent', () => {
  let component: TrainSchoolAdminComponent;
  let fixture: ComponentFixture<TrainSchoolAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainSchoolAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainSchoolAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
