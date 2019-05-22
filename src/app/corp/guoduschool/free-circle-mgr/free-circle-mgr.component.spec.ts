import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeCircleMgrComponent } from './free-circle-mgr.component';

describe('FreeCircleMgrComponent', () => {
  let component: FreeCircleMgrComponent;
  let fixture: ComponentFixture<FreeCircleMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeCircleMgrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeCircleMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
