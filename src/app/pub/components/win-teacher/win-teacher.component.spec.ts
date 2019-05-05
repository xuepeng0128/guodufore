import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinTeacherComponent } from './win-teacher.component';

describe('WinTeacherComponent', () => {
  let component: WinTeacherComponent;
  let fixture: ComponentFixture<WinTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
