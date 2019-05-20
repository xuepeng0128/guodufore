import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {ITeacherArticleQueryParams} from '../../interface/queryparams/ITeacherArticleQueryParams';
import {Observable} from 'rxjs';
import {ITeacherArticleQueryResult} from '../../interface/queryparams/ITeacherArticleQueryResult';
import {map} from 'rxjs/operators';
import {TeacherArticle} from '../../../entity/TeacherArticle';

@Injectable({
  providedIn: 'root'
})
export class TeacherArticleService {

  constructor(private httpsvr: HttpService) { }


  teacherArticleList = (queryParams: ITeacherArticleQueryParams): Observable<Array<ITeacherArticleQueryResult>> => {
         return this.httpsvr.onHttpGet('api/business/teacherArticle/teacherArticleList', queryParams).pipe(
             map( re => re as Array<ITeacherArticleQueryResult>)
         );
   }

   teacherArticleTotal = (queryParams: ITeacherArticleQueryParams): Observable<number> => {
     return this.httpsvr.onHttpGet('api/business/teacherArticle/teacherArticleListTotal', queryParams).pipe(
       map( re => parseInt( re.result , 10) )
     );
   }

   insertTeacherArticle = (teacherArticle: TeacherArticle): Observable<string> => {
       return this.httpsvr.onHttpPost('api/business/teacherArticle/insertArticle', teacherArticle).pipe(
         map( re => re.result)
       );
   }

  updateTeacherArticle = (teacherArticle: TeacherArticle): Observable<string> => {
    return this.httpsvr.onHttpPost('api/business/teacherArticle/updateArticle', teacherArticle).pipe(
      map( re => re.result)
    );
  }

  publishTeacherArticle = (paras: {articleId: string , teacherHabitIds: Array<string>}): Observable<string> => {
    return  this.httpsvr.onHttpPost('api/business/teacherArticle/publishTeacherArticle', paras).pipe(
      map( re => re.result)
    );
  }

  deleteTeacherArticle = (articleId: string): Observable<string> => {
    return this.httpsvr.onHttpGet('api/business/teacherArticle/deleteTeacherArticle', {articleId}).pipe(
      map( re =>  re.result)
    );
  }


}
