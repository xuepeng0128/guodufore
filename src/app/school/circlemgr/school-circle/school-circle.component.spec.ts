import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCircleComponent } from './school-circle.component';

describe('SchoolCircleComponent', () => {
  let component: SchoolCircleComponent;
  let fixture: ComponentFixture<SchoolCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
