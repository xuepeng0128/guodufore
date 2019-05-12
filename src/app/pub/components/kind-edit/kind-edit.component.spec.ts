import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KindEditComponent } from './kind-edit.component';

describe('KindEditComponent', () => {
  let component: KindEditComponent;
  let fixture: ComponentFixture<KindEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KindEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KindEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
