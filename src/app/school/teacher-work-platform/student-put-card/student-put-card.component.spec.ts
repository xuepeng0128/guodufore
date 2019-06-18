import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPutCardComponent } from './student-put-card.component';

describe('StudentPutCardComponent', () => {
  let component: StudentPutCardComponent;
  let fixture: ComponentFixture<StudentPutCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPutCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPutCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
