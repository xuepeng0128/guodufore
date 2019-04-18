import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleClassComponent } from './circle-class.component';

describe('CircleClassComponent', () => {
  let component: CircleClassComponent;
  let fixture: ComponentFixture<CircleClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircleClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
