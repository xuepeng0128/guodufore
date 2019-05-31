import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../entity/User';
import {UserService} from '../../shared/user.service';
import {NzMessageService} from 'ng-zorro-antd';
import {map, switchMap} from 'rxjs/operators';
import {isNullOrUndefined} from 'util';
import {combineLatest, Observable, of, Subject} from 'rxjs';
import {TeacherService} from '../../shared/service/basemsg/teacher.service';
import {EmployeeService} from '../../shared/service/system/employee.service';
import {SchoolService} from '../../shared/service/basemsg/school.service';
import {LoginUser} from '../../entity/LoginUser';
import {ISchoolQueryParams} from '../../shared/interface/queryparams/ISchoolQueryParams';
import {ITeacherQueryParams} from '../../shared/interface/queryparams/ITeacherQueryParams';
import {ISchoolQueryResult} from '../../shared/interface/queryparams/ISchoolQueryResult';
import {School} from '../../entity/School';
import {ITeacherQueryResult} from '../../shared/interface/queryparams/ITeacherQueryResult';
import {Teacher} from '../../entity/Teacher';
import {Employee} from '../../entity/Employee';
import {UEditorComponent} from 'ngx-ueditor';

declare var  UE: any;

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {
  @ViewChild('test') test: HTMLElement;
  text = 'sdgfdsgreterwtgsdg';
  aa: any;
  user: User = new User();
  loading = false;
  pro = 0;
  schoolQueryParams: ISchoolQueryParams = {
    schoolId : '',
    pageSize : 1000,
    pageNo : 1,
    pageBegin: 0
  };
  teacherQueryParams: ITeacherQueryParams = {
    teacherId: '',
    pageSize: 1,
    pageNo: 1,
    pageBegin : 0
  };
  loginUser: LoginUser = new LoginUser();
  constructor(private message: NzMessageService, private usersvr: UserService,
              private teachersvr: TeacherService, private employeesvr: EmployeeService,
              private schoolsvr: SchoolService,
              private router: Router ) { }

  ngOnInit() {

  }
  onselecttext = (e) => {
    this.aa = getSelection();
    alert(this.aa.toString());
    alert(e.target.selectionStart);
    alert(e.target.selectionEnd);
  }


  onLogin = () => {
    this.loading = true;
    this.usersvr.onvalidateLogin(this.user).pipe(
      map(
        userlist => {
          this.pro += 50;
          if (! isNullOrUndefined(userlist) && userlist.length !== 0 ) {
            this.user = userlist[0];
            this.loginUser.user = this.user;
            return true;
          } else {
            this.loading = false;
            this.pro -= 50;
            this.message.create('error', '用户名或密码错误!');
            return false;
          }

        }
      )
    ) .subscribe(res => {
        if (res) {
              this.getOtherMsg().subscribe(
                re => {
                  this.usersvr.setUserStorage(this.loginUser);
                  this.router.navigate(['/']);
                }
              );
        }
      }
    );
  }


  getOtherMsg = (): Observable<string>  => {
      if (this.loginUser.user.supperAdmin) {
        this.loginUser.isSupperAdmin = true;
        return of('ok');
      } else if (this.loginUser.user.schoolAdmin ) {
        this.loginUser.isSchoolAdmin = true;
        this.schoolQueryParams.schoolId = this.loginUser.user.schoolId;
        return this.schoolsvr.schoolList(this.schoolQueryParams).pipe(
              map( (re: Array < ISchoolQueryResult >) => {
                      const result: ISchoolQueryResult = re[0];
                      this.loginUser.school = new School({schoolId: result.schoolId, schoolName: result.schoolName, cityId: result.cityId,
                                                                      districtId: result.districtId, longitude: result.longitude, latitude: result.latitude,
                                                                      tel: result.tel, linkMan: result.linkMan, address: result.address, schoolStyle: result.schoolStyle,
                                                                      saleManId: result.saleManId, regTime: result.regTime, train: result.train }) ;
                      this.usersvr.setUserStorage(this.loginUser);
                      return 'ok';
              })
        );
      } else if (!isNullOrUndefined(this.user.teacherId) && this.user.teacherId !== '') {
          this.loginUser.isTeacher = true;
          this.teacherQueryParams.teacherId = this.user.teacherId;
          this.schoolQueryParams.schoolId = this.user.schoolId;
          return combineLatest(
                     this.teachersvr.teacherList(this.teacherQueryParams).pipe(
                       map( (re: Array < ITeacherQueryResult >) => {
                         const result: ITeacherQueryResult = re[0];
                         this.loginUser.teacher = new Teacher({
                            teacherId : result.teacherId,
                           teacherPaperId: result.teacherPaperId,
                           tel: result.tel,
                           teacherName: result.teacherName,
                           teacherDutyId: result.teacherDutyId,
                           master : result.master,
                           teacherDutyName: result.teacherDutyName,
                           address: result.address,
                           schoolId: result.schoolId
                         });
                         return 'ok';
                       } )
                     ),
                     this.schoolsvr.schoolList(this.schoolQueryParams).pipe(
                       map( (re: Array < ISchoolQueryResult >) => {
                         const result: ISchoolQueryResult = re[0];
                         this.loginUser.school = new School({schoolId: result.schoolId, schoolName: result.schoolName, cityId: result.cityId,
                           districtId: result.districtId, longitude: result.longitude, latitude: result.latitude,
                           tel: result.tel, linkMan: result.linkMan, address: result.address, schoolStyle: result.schoolStyle,
                           saleManId: result.saleManId, regTime: result.regTime, train: result.train }) ;
                         return 'ok';
                       })

                     )
          ).pipe(
            switchMap(() => {
              this.usersvr.setUserStorage(this.loginUser);
              return  of('ok');
            })
          );
      } else if (!isNullOrUndefined(this.user.employeeId) && this.user.employeeId !== '') {
          this.loginUser.isEmployee = true;
          return this.employeesvr.employeeList({employeeId: this.user.employeeId}).pipe(
               map( (re: Array<Employee>) => {
                         this.loginUser.employee = re[0];
                         return 'ok';
                })
          );
      }
  }






}
