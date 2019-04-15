import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSchoolComponent } from './current-school.component';

describe('CurrentSchoolComponent', () => {
  let component: CurrentSchoolComponent;
  let fixture: ComponentFixture<CurrentSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
