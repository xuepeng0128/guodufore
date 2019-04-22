import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolclassesSelectComponent } from './schoolclasses-select.component';

describe('SchoolclassesSelectComponent', () => {
  let component: SchoolclassesSelectComponent;
  let fixture: ComponentFixture<SchoolclassesSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolclassesSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolclassesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
