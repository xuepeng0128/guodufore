import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuodubiSelectComponent } from './guodubi-select.component';

describe('GuodubiSelectComponent', () => {
  let component: GuodubiSelectComponent;
  let fixture: ComponentFixture<GuodubiSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuodubiSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuodubiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
