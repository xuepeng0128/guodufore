import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinSchoolComponent } from './win-school.component';

describe('WinSchoolComponent', () => {
  let component: WinSchoolComponent;
  let fixture: ComponentFixture<WinSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
