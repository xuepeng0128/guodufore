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
  html = 'hello ';
  @ViewChild('full') full: UEditorComponent;
  editOrder$: Subject<{order: string; htmlContent: string}> = new Subject<{order: string; htmlContent: string}>();
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
    const ue = UE.getEditor('container');
    UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
    UE.Editor.prototype.getActionUrl = function(action) {
      if (action === 'uploadimage' || action === 'uploadscrawl' || action === 'uploadimage') {
        return 'http://localhost:8080/eguodu/uploadMediaFile'; // 在这里返回我们实际的上传图片地址
      } else {
        return this._bkGetActionUrl.call(this, action);
      }
    };

  }
  getit = (e) => {
     console.log(e);
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







  onPreReady = (comp: UEditorComponent) => {
    UE.registerUI('button', (editor, uiName) => {
      // 注册按钮执行时的command命令，使用命令默认就会带有回退操作
      editor.registerCommand(uiName, {
        execCommand() {
          // alert('execCommand:' + uiName);

        }
      });
      // 创建一个button
      const btn = new UE.ui.Button({
        // 按钮的名字
        name: uiName,
        // 提示
        title: uiName,
        // 添加额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-position: -726px -77px;',
        // 点击时执行的命令
        onclick : () => {
          // 这里可以不用执行命令,做你自己的操作也可
         // editor.execCommand(uiName);
          this.onchooseimg();
        }
      });
      // 当点到编辑内容上时，按钮要做的状态反射
      editor.addListener('selectionchange', () => {
        const state = editor.queryCommandState(uiName);
        if (state == -1) {
          btn.setDisabled(true);
          btn.setChecked(false);
        } else {
          btn.setDisabled(false);
          btn.setChecked(state);
        }
      });
      // 因为你是添加button,所以需要返回这个button
      return btn;
    }, 5, comp.id);
    // comp.id 是指当前UEditor实例Id
  }


  onchooseimg = () => {

    this.full.Instance.execCommand('inserthtml', '<img src="http://pic44.nipic.com/20140716/8716187_010828140000_2.jpg" />');
   alert(this.html);
  }


}
