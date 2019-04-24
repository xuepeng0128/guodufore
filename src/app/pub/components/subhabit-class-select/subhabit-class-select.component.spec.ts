import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubhabitClassSelectComponent } from './subhabit-class-select.component';

describe('SubhabitClassSelectComponent', () => {
  let component: SubhabitClassSelectComponent;
  let fixture: ComponentFixture<SubhabitClassSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubhabitClassSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubhabitClassSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
