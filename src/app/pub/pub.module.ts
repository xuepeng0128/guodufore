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



@NgModule({
  declarations: [CitySelectComponent, DistrictSelectComponent, WinSchoolComponent,
    EmployeeSelectComponent, CutSizePipe, ArrayTextFilterPipe, WinEmployeeComponent,  HabitClassSelectComponent,
    WinHabitComponent, WinClassesComponent, YearSelectComponent, TeacherChooseComponent, StudySubjectSelectComponent,
    SchoolSelectComponent,
    CorpDutySelectComponent],
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
    DistrictSelectComponent,
    EmployeeSelectComponent,
    SchoolSelectComponent,
    CorpDutySelectComponent,
    HabitClassSelectComponent,
    StudySubjectSelectComponent,
    CutSizePipe,
    ArrayTextFilterPipe
    ]
})
export class PubModule { }
