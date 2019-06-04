import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { CitySelectComponent } from './components/city-select/city-select.component';
import { DistrictSelectComponent } from './components/district-select/district-select.component';
import {CutSizePipe} from './pipe/cutSize.pipe';
import { WinSchoolComponent } from './components/win-school/win-school.component';
import { EmployeeSelectComponent } from './components/employee-select/employee-select.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { HabitClassSelectComponent } from './components/habit-class-select/habit-class-select.component';
import { WinClassesComponent } from './components/win-classes/win-classes.component';
import {YearSelectComponent} from './components/year-select/year-select.component';
import { TeacherChooseComponent } from './components/teacher-choose/teacher-choose.component';
import {ArrayTextFilterPipe} from './pipe/array-text-filter.pipe';
import {WinEmployeeComponent} from './components/win-employee/win-employee.component';
import { StudySubjectSelectComponent } from './components/study-subject-select/study-subject-select.component';
import { SchoolSelectComponent } from './components/school-select/school-select.component';
import { CorpDutySelectComponent } from './components/corp-duty-select/corp-duty-select.component';
import { SchoolyearSelectComponent } from './components/schoolyear-select/schoolyear-select.component';
import { SchoolclassesSelectComponent } from './components/schoolclasses-select/schoolclasses-select.component';
import { SubhabitClassSelectComponent } from './components/subhabit-class-select/subhabit-class-select.component';
import { TeacherdutySelectComponent } from './components/teacherduty-select/teacherduty-select.component';

import { WinTeacherComponent } from './components/win-teacher/win-teacher.component';
import { StudentCardComponent } from './components/student-card/student-card.component';
import { WinHabitTemplateComponent } from './components/win-habit-template/win-habit-template.component';
import { HabitUnitSelectComponent } from './components/habit-unit-select/habit-unit-select.component';
import { WinIconChooseComponent } from './components/win-icon-choose/win-icon-choose.component';
import { HabitModeSelectComponent } from './components/habit-mode-select/habit-mode-select.component';
import { HabitTimeUnitSelectComponent } from './components/habit-time-unit-select/habit-time-unit-select.component';
import {NgxLoadingModule} from 'ngx-loading';
import { WinStudentComponent } from './components/win-student/win-student.component';
import { SexSelectComponent } from './components/sex-select/sex-select.component';
import { WinCircleComponent } from './components/win-circle/win-circle.component';
import { CircleClassSelectComponent } from './components/circle-class-select/circle-class-select.component';
import { GradeClassSelectComponent } from './components/grade-class-select/grade-class-select.component';
import { WinNoExamHabitComponent } from './components/win-no-exam-habit/win-no-exam-habit.component';
import { WinExamHabitComponent } from './components/win-exam-habit/win-exam-habit.component';
import { CircleStudentChooseComponent } from './components/circle-student-choose/circle-student-choose.component';
import { HabitTemplateChooseComponent } from './components/habit-template-choose/habit-template-choose.component';
import { GuodubiSelectComponent } from './components/guodubi-select/guodubi-select.component';
import {UEditorModule} from 'ngx-ueditor';
import { HabitChooseComponent } from './components/habit-choose/habit-choose.component';
import { ProvinceSelectComponent } from './components/province-select/province-select.component';



@NgModule({
  declarations: [CitySelectComponent, DistrictSelectComponent, WinSchoolComponent,
    EmployeeSelectComponent, CutSizePipe, ArrayTextFilterPipe, WinEmployeeComponent,  HabitClassSelectComponent,
    WinClassesComponent, YearSelectComponent, TeacherChooseComponent, StudySubjectSelectComponent,
    SchoolSelectComponent,
    CorpDutySelectComponent,
    SchoolyearSelectComponent,
    SchoolclassesSelectComponent,
    SubhabitClassSelectComponent,
    TeacherdutySelectComponent,
    WinTeacherComponent,
    StudentCardComponent,

    WinHabitTemplateComponent,
    HabitUnitSelectComponent,
    WinIconChooseComponent,
    HabitModeSelectComponent,
    HabitTimeUnitSelectComponent,
    WinStudentComponent,
    SexSelectComponent,
    WinCircleComponent,
    CircleClassSelectComponent,
    GradeClassSelectComponent,
    WinNoExamHabitComponent,
    WinExamHabitComponent,
    CircleStudentChooseComponent,
    HabitTemplateChooseComponent,
    GuodubiSelectComponent,
    HabitChooseComponent,
    ProvinceSelectComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    ColorPickerModule,
    NgxLoadingModule.forRoot({}),
    UEditorModule.forRoot({
      js: [
        `./assets/ueditor/ueditor.config.js`,
        `./assets/ueditor/ueditor.all.js`,
      ],
      // 默认前端配置项
      options: {
        UEDITOR_HOME_URL: './assets/ueditor/'
      }
    })
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    ColorPickerModule,
    UEditorModule,
    WinSchoolComponent,
    WinEmployeeComponent,
    NgxLoadingModule,
    WinClassesComponent,
    WinTeacherComponent,
    YearSelectComponent,
    CitySelectComponent,
    DistrictSelectComponent,
    EmployeeSelectComponent,
    SchoolSelectComponent,
    CorpDutySelectComponent,
    HabitClassSelectComponent,
    StudySubjectSelectComponent,
    SubhabitClassSelectComponent,
    TeacherdutySelectComponent,
    StudentCardComponent,
    CutSizePipe,
    ArrayTextFilterPipe,
    WinHabitTemplateComponent,
    HabitUnitSelectComponent,
    WinIconChooseComponent,
    HabitModeSelectComponent,
    HabitTimeUnitSelectComponent,
    WinStudentComponent,
    SexSelectComponent,
    TeacherChooseComponent,
    WinCircleComponent,
    CircleClassSelectComponent,
    GradeClassSelectComponent,
    WinNoExamHabitComponent,
    WinExamHabitComponent,
    CircleStudentChooseComponent,
    HabitTemplateChooseComponent,
    GuodubiSelectComponent,
    HabitChooseComponent,
    ProvinceSelectComponent
  ]
})
export class PubModule { }
