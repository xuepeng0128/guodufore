import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleClassSelectComponent } from './circle-class-select.component';

describe('CircleClassSelectComponent', () => {
  let component: CircleClassSelectComponent;
  let fixture: ComponentFixture<CircleClassSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircleClassSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleClassSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
