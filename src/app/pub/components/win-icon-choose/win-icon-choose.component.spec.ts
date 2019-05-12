import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinIconChooseComponent } from './win-icon-choose.component';

describe('WinIconChooseComponent', () => {
  let component: WinIconChooseComponent;
  let fixture: ComponentFixture<WinIconChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinIconChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinIconChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
