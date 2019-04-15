import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinEmployeeComponent } from './win-employee.component';

describe('WinEmployeeComponent', () => {
  let component: WinEmployeeComponent;
  let fixture: ComponentFixture<WinEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
