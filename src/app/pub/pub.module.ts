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

import { HabitClassSelectComponent } from './components/habit-class-select/habit-class-select.component';
import { WinHabitComponent } from './components/win-habit/win-habit.component';
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



@NgModule({
  declarations: [CitySelectComponent, DistrictSelectComponent, WinSchoolComponent,
    EmployeeSelectComponent, CutSizePipe, ArrayTextFilterPipe, WinEmployeeComponent,  HabitClassSelectComponent,
    WinHabitComponent, WinClassesComponent, YearSelectComponent, TeacherChooseComponent, StudySubjectSelectComponent,
    SchoolSelectComponent,
    CorpDutySelectComponent,
    SchoolyearSelectComponent,
    SchoolclassesSelectComponent,
    SubhabitClassSelectComponent,
    TeacherdutySelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,

    WinSchoolComponent,
    WinEmployeeComponent,
    WinHabitComponent,
    WinClassesComponent,
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
    CutSizePipe,
    ArrayTextFilterPipe
    ]
})
export class PubModule { }
