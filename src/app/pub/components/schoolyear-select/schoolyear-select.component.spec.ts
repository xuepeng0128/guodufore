import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolyearSelectComponent } from './schoolyear-select.component';

describe('SchoolyearSelectComponent', () => {
  let component: SchoolyearSelectComponent;
  let fixture: ComponentFixture<SchoolyearSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolyearSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolyearSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
