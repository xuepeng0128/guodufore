export class TeacherArticle {
    articleId: string;
    articleTitle: string;
    makeDate: Date;
    teacherId: string;
    teacherName: string;
    schoolId: string;
    schoolName: string;
    articleContent: string;
    published: boolean;

  constructor(options: {articleId?: string, articleTitle?: string, makeDate?: Date, teacherId?: string,
                        teacherName?: string, schoolId?: string, schoolName?: string, articleContent?: string,
                        published?: boolean}= {}) {
    this.articleId = options.articleId || '';
    this.articleTitle = options.articleTitle || '';
    this.makeDate = options.makeDate || new Date();
    this.teacherId = options.teacherId || '';
    this.teacherName = options.teacherName || '';
    this.schoolId = options.schoolId || '';
    this.schoolName = options.schoolName || '';
    this.articleContent = options.articleContent || '';
    this.published = options.published || false;
  }
}
