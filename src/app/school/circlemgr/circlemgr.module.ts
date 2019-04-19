import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CirclemgrRoutingModule } from './circlemgr-routing.module';
import { SchoolCircleComponent } from './school-circle/school-circle.component';
import { TeacherArticleComponent } from './teacher-article/teacher-article.component';
import { TeacherCourseComponent } from './teacher-course/teacher-course.component';


@NgModule({
  declarations: [ SchoolCircleComponent, TeacherArticleComponent, TeacherCourseComponent],

  imports: [
    CommonModule,
    CirclemgrRoutingModule
  ]
})
export class CirclemgrModule { }
