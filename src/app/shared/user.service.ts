import { Injectable } from '@angular/core';
import {User} from '../entity/User';
import {HttpService} from './service/baseapi/http.service';
import {Observable} from 'rxjs';

import {IUserList} from './interface/IUserList';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  STORAGE_KEY = '_user';
  constructor(private httpsvr: HttpService) { }

  getUserStorage = (): User => {
    const user = sessionStorage.getItem(this.STORAGE_KEY);
    if (user) {
      return JSON.parse(user) as User;
    }
    return null;
  }
 setUserStorage = (user: User) => {
   if (user) {
     sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
   }
 }

 onvalidateLogin = (user: User): Observable<User> => {

     return this.httpsvr.onHttpPost('/api/system/user/validateUser', user);
 }

userList = (queryParams: any): Observable<Array<IUserList>> => {
  return this.httpsvr.onHttpGet('/api/system/user/userList', queryParams).pipe(
      map(re =>  re as Array<IUserList>)
  );
}
  userListTotal = (queryParams: any): Observable<Array<IUserList>> => {
    return this.httpsvr.onHttpGet('/api/system/user/userList', queryParams).pipe(
      map(re =>  re as Array<IUserList>)
    );
  }
insertUser = (user: User ): Observable<User> => {
  return this.httpsvr.onHttpPost('/api/system/user/insertUser', user);
}

  updateUser = (user: User ): Observable<User> => {
    return this.httpsvr.onHttpPost('/api/system/user/updateUser', user);
  }

  deleteUser = (account: string): Observable<string> => {
    return this.httpsvr.onHttpGet('/api/system/user/deleteUser', {account});

  }

}
