import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SexSelectComponent } from './sex-select.component';

describe('SexSelectComponent', () => {
  let component: SexSelectComponent;
  let fixture: ComponentFixture<SexSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SexSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SexSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
