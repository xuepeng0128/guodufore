import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpDutySelectComponent } from './corp-duty-select.component';

describe('CorpDutySelectComponent', () => {
  let component: CorpDutySelectComponent;
  let fixture: ComponentFixture<CorpDutySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpDutySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpDutySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
