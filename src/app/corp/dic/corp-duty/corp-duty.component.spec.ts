import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpDutyComponent } from './corp-duty.component';

describe('CorpDutyComponent', () => {
  let component: CorpDutyComponent;
  let fixture: ComponentFixture<CorpDutyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpDutyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
