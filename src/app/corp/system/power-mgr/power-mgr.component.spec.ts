import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerMgrComponent } from './power-mgr.component';

describe('PowerMgrComponent', () => {
  let component: PowerMgrComponent;
  let fixture: ComponentFixture<PowerMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerMgrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
