import { Injectable } from '@angular/core';
import {User} from '../entity/User';
import {HttpService} from './service/baseapi/http.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LoginUser} from '../entity/LoginUser';
import {IUserQueryResult} from './interface/queryparams/IUserQueryResult';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  STORAGE_KEY = '_loginuser';
  constructor(private httpsvr: HttpService) { }

  getUserStorage = (): LoginUser => {
    const user = sessionStorage.getItem(this.STORAGE_KEY);
    if (user) {
      return JSON.parse(user) as LoginUser;
    }
    return null;
  }
 setUserStorage = (user: LoginUser) => {
   if (user) {
     sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
   }
 }

 onvalidateLogin = (user: User): Observable<User> => {
     return this.httpsvr.onHttpPost('/api/system/user/validateUser', user);
 }

userList = (queryParams: any): Observable<Array<IUserQueryResult>> => {
  return this.httpsvr.onHttpGet('/api/system/user/userList', queryParams);
}
  userListTotal = (queryParams: any): Observable<number> => {
    return this.httpsvr.onHttpGet('/api/system/user/userListTotal', queryParams);
  }
insertUser = (user: User ): Observable<string> => {
  return this.httpsvr.onHttpPost('/api/system/user/insertUser', user);
}

  updateUser = (user: User ): Observable<string> => {
    return this.httpsvr.onHttpPost('/api/system/user/updateUser', user);
  }

  deleteUser = (account: string): Observable<string> => {
    return this.httpsvr.onHttpGet('/api/system/user/deleteUser', {account});

  }

}
