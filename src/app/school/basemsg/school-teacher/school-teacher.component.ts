import { Component, OnInit } from '@angular/core';
import {combineLatest, Observable, of} from 'rxjs';
import {TeacherService} from '../../../shared/service/basemsg/teacher.service';
import {UserService} from '../../../shared/user.service';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {LoginUser} from '../../../entity/LoginUser';
import {ITeacherQueryResult} from '../../../shared/interface/queryparams/ITeacherQueryResult';
import {ITeacherQueryParams} from '../../../shared/interface/queryparams/ITeacherQueryParams';
import {DOWNLOAD_TEMPLATE_PATH, UPLOAD_TEACHER_TEMPLATE_PATH} from '../../../shared/const';
import {Teacher} from '../../../entity/Teacher';

@Component({
  selector: 'app-school-teacher',
  templateUrl: './school-teacher.component.html',
  styleUrls: ['./school-teacher.component.css']
})
export class SchoolTeacherComponent implements OnInit {
  loginUser: LoginUser = this.usersvr.getUserStorage();
  teacherList: Array<ITeacherQueryResult> = new Array<ITeacherQueryResult>() ;
  total = 0;

  queryParams: ITeacherQueryParams = {
    schoolId : this.loginUser.school.schoolId,
    teacherName : '' ,
    schoolName : '' ,
    pageSize : 20 ,
    pageNo : 1 ,
    pageBegin : 0
  };
  downloadTemplateExcel = DOWNLOAD_TEMPLATE_PATH + 'teacherTemplate.xls';
  uploadExcelpath = UPLOAD_TEACHER_TEMPLATE_PATH;
  isTeacherExcelImpModalShow = false;
  prepareImportTeachers: Array<Teacher> = new Array<Teacher>();
constructor(private teachersvr: TeacherService, private  usersvr: UserService, private message: NzMessageService ) { }

ngOnInit() {
  this.onQuery();
  }
onQuery = () => {
  this.queryParams.pageNo = 1;
  this.queryParams.pageBegin = (this.queryParams.pageNo - 1) * this.queryParams.pageSize;
  combineLatest(
     this.teachersvr.teacherList(this.queryParams),
     this.teachersvr.teacherListTotal(this.queryParams)
   ).subscribe( re => {
        this.teacherList = re[0];
        this.total = re[1];
   });
  }
onPageChange = (e) => {
    this.queryParams.pageNo = e;
    this.teachersvr.teacherList(this.queryParams).subscribe(re => {
       this.teacherList = re;
    });
  }




onExcelExport = () => {

  }
handleExcelChange = (file: UploadFile) => {
  if (file.response) {
    this.isTeacherExcelImpModalShow = true;
    this.prepareImportTeachers = JSON.parse(file.response);
  }

}


  onToImportTeachers = () => {
    this.teachersvr.onGroupSaveTeacher(this.prepareImportTeachers).subscribe(
      re => {
        this.onQuery();
        this.isTeacherExcelImpModalShow = false;
      }
    );
  }


getSchoolId = () => {
  return {schoolId : this.loginUser.school.schoolId};
}
}
