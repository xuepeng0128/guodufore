import { Injectable } from '@angular/core';
import {User} from '../entity/User';
import {HttpService} from './service/baseapi/http.service';
import {Observable} from 'rxjs';

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
     return this.httpsvr.onHttpPost('/api/corp/system/user/validateUser', user);
 }

userList = (queryParams: any): Observable<Array<User>> => {
  return this.httpsvr.onHttpGet('/api/corp/system/user/userList', queryParams);
}

insertUser = (user: User ): Observable<User> => {
  return this.httpsvr.onHttpPost('/api/corp/system/user/insertUser', user);
}

  updateUser = (user: User ): Observable<User> => {
    return this.httpsvr.onHttpPost('/api/corp/system/user/updateUser', user);
  }

  deleteUser = (account: string): Observable<string> => {
    return this.httpsvr.onHttpGet('/api/corp/system/user/deleteUser', {account});
  }

}
