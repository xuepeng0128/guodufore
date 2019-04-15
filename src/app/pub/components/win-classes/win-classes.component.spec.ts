import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinClassesComponent } from './win-classes.component';

describe('WinClassesComponent', () => {
  let component: WinClassesComponent;
  let fixture: ComponentFixture<WinClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
