import {AfterViewInit, Component, OnInit} from '@angular/core';

import {HttpService} from '../../shared/service/baseapi/http.service';
import {UserService} from '../../shared/user.service';
import {User} from '../../entity/User';
import {iif, Observable} from 'rxjs';
import {Menu} from '../../entity/Menu';
import {MenuService} from '../../shared/service/system/menu.service';
import {of} from 'rxjs/internal/observable/of';
import {LoginUser} from '../../entity/LoginUser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit, AfterViewInit {
  loading = false;
  user: LoginUser = this.usersvr.getUserStorage();
  menuArray$: Observable<Array<Menu>> = iif(
    () => this.user.isSupperAdmin ,
                this.menusvr.loadSupperAdminMenu(),
                iif(
                  () => this.user.isSchoolAdmin,
                              this.menusvr.loadSchoolAdminMenu(),
                              iif(
                                () => this.user.isEmployee,
                                           this.menusvr.loadEmployeeMenu(),
                                           this.menusvr.loadTeacherMenu()
                              )
                )


  );
  pareMenuName = '';
  subMenuName = '';
  clientHeight: number = document.documentElement.clientHeight - 200; // 客户区高度
  constructor( private httpsvr: HttpService, private usersvr: UserService, private menusvr: MenuService, private router: Router) { }

  ngOnInit() {
  }
 ngAfterViewInit() {
      setTimeout(() => {
        this.httpsvr.pageLoading$.subscribe(value => this.loading = value);
      }, 100);

 }
 onChangePwd = () => {
   this.router.navigate(['/frame/corpsystem/changePwd']);
 }
  outSystem = () => {
    this.router.navigate(['/account/signin']);
  }
}
