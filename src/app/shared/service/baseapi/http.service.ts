import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subject, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, delay, map} from 'rxjs/internal/operators';
import {UserStorageService} from './user-storage.service';
import {User} from '../../../entity/User';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  pageLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private httpclient: HttpClient, private userstorage: UserStorageService) { }

  // get  方法
  public  onHttpGet = (url: string, queryParams: any): Observable<any> => {
    this.pageLoading$.next(true);
    let paramData = '';
    const user = this.userstorage.Get() as User;
    if (queryParams === null) {queryParams = {}; }
    if (queryParams != null) {
      for (const i in queryParams) {
        if (Array.isArray(queryParams[i])) { continue; }
        if (typeof queryParams[i] === 'object') {
          if (queryParams[i] != null) {
            paramData = paramData === '' ? '?' : '&';
            paramData +=  i + '=' + JSON.stringify(queryParams[i]);
          }
        } else {
          if (queryParams[i] != null) {
            paramData += (paramData === '' ? '?' : '&');
            paramData += ( i + '=' + queryParams[i]);
          }
        }
      }
    }
    return this.httpclient.get<any>(   url + paramData) // globalParams.serverBaseUrl +
      .pipe(
        map(re => {
          this.pageLoading$.next(false);
          return re;

        }),
        catchError(
          this.handleError)
      );
  }

// post 方法
  public onHttpPost = (url: string , queryParams: any): Observable<any> => {
    this.pageLoading$.next(true);
    return this.httpclient.post<any>( url, queryParams, httpOptions) // globalParams.serverBaseUrl +
      .pipe(
        map(re => {
          this.pageLoading$.next(false);
          return re;
        }),
        catchError(this.handleError)
      );
  }

  // 错误处理
  private handleError(error: HttpErrorResponse) {
    this.pageLoading$.next(false);
    if (error.error instanceof ErrorEvent) {
      // 客户端网络连接错误.
      console.error('错误发生:', error.error.message);
    } else {

      //  未响应,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // 返回自定义错误信息
    return throwError(
      '请求服务端错误，请重试或联系运维人员.');
  }
}
