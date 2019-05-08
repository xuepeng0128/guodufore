import { TestBed } from '@angular/core/testing';

import { TeacherArticleService } from './teacher-article.service';

describe('TeacherArticleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeacherArticleService = TestBed.get(TeacherArticleService);
    expect(service).toBeTruthy();
  });
});
