import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Teacher} from '../../../entity/Teacher';
import {TeacherService} from '../../../shared/service/basemsg/teacher.service';
import {map} from 'rxjs/operators';
import {User} from '../../../entity/User';
import {UserService} from '../../../shared/user.service';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {ClassesService} from '../../../shared/service/basemsg/classes.service';

@Component({
  selector: 'app-school-teacher',
  templateUrl: './school-teacher.component.html',
  styleUrls: ['./school-teacher.component.css']
})
export class SchoolTeacherComponent implements OnInit {
  user: User = this.usersvr.getUserStorage();
  teacherList$: Observable<Array<Teacher>> = new Observable<Array<Teacher>>() ;
  total = 0;

queryParams = {
    paperId : '',
    teacherName : '',
    schoolName : '',
    duty : '',
    pageSize : 20,
    pageNo : 1,
    getTotal : '1'
  };
constructor(private teachersvr: TeacherService, private  usersvr: UserService, private message: NzMessageService ) { }

ngOnInit() {
  this.onQuery();
  }
onQuery = () => {
    this.queryParams.getTotal = '1';
    this.queryParams.pageNo = 1;
    this.teacherList$ = this.teachersvr.teacherList(this.queryParams).pipe(
      map(re => {
        this.total = re.total;
        return re.list;
      })
    );
  }

onPageChange = (e) => {
    this.queryParams.pageNo = e;
    this.queryParams.getTotal = '0';
    this.teacherList$ = this.teachersvr.teacherList(this.queryParams).pipe(
      map(re => {
        return re.list;
      })
    );
  }
onExcelExport = () => {
    this.teachersvr.onExport(this.queryParams).subscribe();
  }
handleExcelChange = (info: { file: UploadFile, fileList: Array<any> }) => {

}
}
