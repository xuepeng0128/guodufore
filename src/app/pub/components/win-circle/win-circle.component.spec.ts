import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinCircleComponent } from './win-circle.component';

describe('WinCircleComponent', () => {
  let component: WinCircleComponent;
  let fixture: ComponentFixture<WinCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
