import {Component, Input, OnInit} from '@angular/core';
import {combineLatest, Observable, of, Subject} from 'rxjs';
import {TeacherService} from '../../../shared/service/basemsg/teacher.service';
import {UserService} from '../../../shared/user.service';
import {NzMessageService, NzModalService, UploadFile} from 'ng-zorro-antd';
import {LoginUser} from '../../../entity/LoginUser';
import {ITeacherQueryResult} from '../../../shared/interface/queryparams/ITeacherQueryResult';
import {ITeacherQueryParams} from '../../../shared/interface/queryparams/ITeacherQueryParams';
import {DOWNLOAD_TEMPLATE_PATH, UPLOAD_TEACHER_TEMPLATE_PATH} from '../../../shared/const';
import {Teacher} from '../../../entity/Teacher';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {flatMap} from 'rxjs/operators';

@Component({
  selector: 'app-school-teacher',
  templateUrl: './school-teacher.component.html',
  styleUrls: ['./school-teacher.component.css']
})
export class SchoolTeacherComponent implements OnInit {
  teacherWinOrder$: Subject<{nowState: string , teacher: Teacher}> = new Subject<{nowState: string, teacher: Teacher}>();
  loginUser: LoginUser = this.usersvr.getUserStorage();
  teacherList: Array<ITeacherQueryResult> = new Array<ITeacherQueryResult>() ;
  total = 0;
   test = `
      <div style="color : red;
  font-size: large;"><img src ="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557391212&di=13ebd07768877176a9a9c4fd6d8fb1ce&imgtype=jpg&er=1&src=http%3A%2F%2Finternetke.com%2Fuploads%2Fallimg%2F160405%2F1-1604052229440-L.jpg" style="width:200px;height:200px" />></div>
   `;
   aa: SafeHtml;
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
constructor(private teachersvr: TeacherService, private  usersvr: UserService,
            private message: NzMessageService,private modalService: NzModalService,
            private sanitizer: DomSanitizer ) { }

ngOnInit() {
  this.onQuery();
  this.aa = this.sanitizer.bypassSecurityTrustHtml(this.test);
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

onAdd = () => {
  this.teacherWinOrder$.next({nowState: 'add', teacher: null});
}
onEdit = (teacher: ITeacherQueryResult) => {
  this.teacherWinOrder$.next({nowState: 'add', teacher: new Teacher({teacherId : teacher.teacherId,
      teacherPaperId : teacher.teacherPaperId, tel : teacher.tel,     teacherName: teacher.teacherName,
      teacherDutyId: teacher.teacherDutyId, address: teacher.address, schoolId : teacher.schoolId})});
}

onQuitDuty = (teacher: ITeacherQueryResult) => {
  this.modalService.confirm({
    nzTitle: '<i>提示</i>',
    nzContent: '<b>确定该老师设置为离职吗?</b>',
    nzOnOk: () => {
      this.teachersvr.onQuitDuty(teacher.teacherId).pipe(
        flatMap(re => this.teachersvr.teacherList(this.queryParams))
      ).subscribe(
        re => {
          this.teacherList = re;
          this.total -= 1;
        }
      );
    }
  });
}
onDelete = (teacher: ITeacherQueryResult) => {
  this.modalService.confirm({
    nzTitle: '<i>提示</i>',
    nzContent: '<b>确定删除该数据吗?</b>',
    nzOnOk: () => {
      this.teachersvr.deleteTeacher(teacher.teacherId).pipe(
        flatMap(re => this.teachersvr.teacherList(this.queryParams))
      ).subscribe(
         re => {
           this.teacherList = re;
           this.total -= 1;
         }
      );
    }
  });
}
handleExcelChange = (file: UploadFile) => {
  if (file.file.response !== null) {
    this.isTeacherExcelImpModalShow = true;
    this.prepareImportTeachers = new Array<Teacher>();
    (file.file.response as Array<Teacher>).forEach( v =>
       this.prepareImportTeachers.push( new Teacher({teacherId: '', teacherPaperId : v.teacherPaperId, schoolId : this.loginUser.school.schoolId
       , tel : v.tel, teacherName : v.teacherName , teacherDutyId : '02' , address : v.address  }))
    );
    file.file.response = null;
  }

}

  removeUploadedfile = () => {

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
