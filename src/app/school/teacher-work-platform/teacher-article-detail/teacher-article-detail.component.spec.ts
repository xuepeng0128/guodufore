import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherArticleDetailComponent } from './teacher-article-detail.component';

describe('TeacherArticleDetailComponent', () => {
  let component: TeacherArticleDetailComponent;
  let fixture: ComponentFixture<TeacherArticleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherArticleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherArticleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
