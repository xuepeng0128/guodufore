import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysParamsComponent } from './sys-params.component';

describe('SysParamsComponent', () => {
  let component: SysParamsComponent;
  let fixture: ComponentFixture<SysParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
