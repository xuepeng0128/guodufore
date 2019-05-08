import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinTeacherArticleComponent } from './win-teacher-article.component';

describe('WinTeacherArticleComponent', () => {
  let component: WinTeacherArticleComponent;
  let fixture: ComponentFixture<WinTeacherArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinTeacherArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinTeacherArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
