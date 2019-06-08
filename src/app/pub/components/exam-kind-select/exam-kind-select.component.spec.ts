import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamKindSelectComponent } from './exam-kind-select.component';

describe('ExamKindSelectComponent', () => {
  let component: ExamKindSelectComponent;
  let fixture: ComponentFixture<ExamKindSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamKindSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamKindSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
