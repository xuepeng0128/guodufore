import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../entity/User';
import {UserService} from '../../shared/user.service';
import {NzMessageService} from 'ng-zorro-antd';
import {map} from 'rxjs/operators';



@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {
  user: User = new User();
  loading = false;
  pro = 0;
  constructor(private message: NzMessageService, private usersvr: UserService,
              private router: Router ) { }

  ngOnInit() {
  }
  onLogin = () => {
    this.loading = true;

    this.usersvr.onvalidateLogin(this.user).pipe(
      map(
        user => {
          this.pro += 50;
          if (user) {
            this.user = user;
            this.usersvr.setUserStorage(user);
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
                this.router.navigate(['/']);
        }
      }
    );
  }

}
