import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesMgrComponent } from './classes-mgr.component';

describe('ClassesMgrComponent', () => {
  let component: ClassesMgrComponent;
  let fixture: ComponentFixture<ClassesMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesMgrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
