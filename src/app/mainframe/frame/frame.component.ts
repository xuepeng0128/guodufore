import {AfterViewInit, Component, OnInit} from '@angular/core';

import {HttpService} from '../../shared/service/baseapi/http.service';
import {UserService} from '../../shared/user.service';
import {User} from '../../entity/User';
import {iif, Observable} from 'rxjs';
import {Menu} from '../../entity/Menu';
import {MenuService} from '../../shared/service/system/menu.service';
import {of} from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit, AfterViewInit {
  loading = false;
  user: User = this.usersvr.getUserStorage();
  menuArray$: Observable<Array<Menu>> = iif(
    () => this.user.supperAdmin || this.user.schoolAdmin || this.user.trainSchoolAdmin ,
               this.menusvr.allMenu(this.user.supperAdmin ? '1' : (this.user.schoolAdmin ? '2' : '3')),
               of(this.user.powerMenu)

  );
  pareMenuName = '';
  subMenuName = '';
  clientHeight: number = document.documentElement.clientHeight - 200; // 客户区高度
  constructor( private httpsvr: HttpService, private usersvr: UserService, private menusvr: MenuService) { }

  ngOnInit() {
  }
 ngAfterViewInit() {
      setTimeout(() => {
        this.httpsvr.pageLoading$.subscribe(value => this.loading = value);
      }, 100);

 }
}
