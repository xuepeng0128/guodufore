import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../entity/User';
import {UserService} from '../../shared/user.service';
import {NzMessageService} from 'ng-zorro-antd';
import {map, switchMap} from 'rxjs/operators';
import {isNullOrUndefined} from 'util';
import {combineLatest, Observable, of} from 'rxjs';
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



@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {
  user: User = new User();
  loading = false;
  pro = 0;
  schoolQueryParams: ISchoolQueryParams = {
    schoolId : '',
    pageSize :1000,
    pageNo :1,
    pageBegin:0
  };
  teacherQueryParams: ITeacherQueryParams = {
    teacherPaperId: ''
  };
  loginUser: LoginUser = new LoginUser();
  constructor(private message: NzMessageService, private usersvr: UserService,
              private teachersvr: TeacherService, private employeesvr: EmployeeService,
              private schoolsvr: SchoolService,
              private router: Router ) { }

  ngOnInit() {
  }
  onLogin = () => {
    this.loading = true;
    this.usersvr.onvalidateLogin(this.user).pipe(
      map(
        userlist => {
          this.pro += 50;
          if (userlist) {
            this.user = userlist[0];
            this.loginUser.user = this.user;
            return true;
          } else {
            this.loading = false;
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
      } else if (!isNullOrUndefined(this.user.teacherPaperId) && this.user.teacherPaperId !== '') {
          this.loginUser.isTeacher = true;
          this.teacherQueryParams.teacherPaperId = this.user.teacherPaperId;
          this.schoolQueryParams.schoolId = this.user.schoolId;
          return combineLatest(
                     this.teachersvr.teacherList(this.teacherQueryParams).pipe(
                       map( (re: Array < ITeacherQueryResult >) => {
                         const result: ITeacherQueryResult = re[0];
                         this.loginUser.teacher = new Teacher({
                           id: result.id,
                           teacherPaperId: result.teacherPaperId,
                           tel: result.tel,
                           teacherName: result.teacherName,
                           teacherDutyId: result.teacherDutyId,
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
