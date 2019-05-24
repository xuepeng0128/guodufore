import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

   paperIdMsg = (paperId: string , num: number) => {
    let birth = '';
    if (num === 1) {
      // 获取出生日期
      birth = paperId.substring(6, 10) + '-' + paperId.substring(10, 12) + '-' + paperId.substring(12, 14);
      return birth;
    }
    if (num === 2) {
      // 获取性别
      if (parseInt(paperId.substr(16, 1), 10) % 2 === 1) {
        // 男
        return '男';
      } else {
        // 女
        return '女';
      }
    }
    if (num === 3) {
      // 获取年龄
      const myDate = new Date();
      const month = myDate.getMonth() + 1;
      const day = myDate.getDate();
      let age = myDate.getFullYear() - parseInt(paperId.substring(6, 10) , 10) - 1;
      if (parseInt(paperId.substring(10, 12) , 10) < month ||
          parseInt(paperId.substring(10, 12), 10) === month &&
          parseInt(paperId.substring(12, 14), 10) <=  day ) {
         age++;
      }
      return age;
    }
  }

  yearBegin = (): Date => {
    return new Date( (new Date()).getFullYear() + '-01-01');
  }
  calculate = (paperId: string): boolean => {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(paperId) === false) {
      return false;
    }
  }

  // 获取当前日期+n天
  dateAdd = (beginDate: Date,  n: number): Date => {
    const date = beginDate; // 获取当前时间
    date.setDate(date.getDate() + n); // 设置天数 -1 天
    return date;
  }

  // 返回时分秒字符串
  retHMSstr = (nowDate: Date): string => {
      const hstr = nowDate.getHours() >= 10 ? nowDate.getHours().toString() : '0' + nowDate.getHours().toString();
      const mstr = nowDate.getMinutes() >= 10 ? nowDate.getMinutes().toString() : '0' + nowDate.getMinutes().toString();
      const sstr = nowDate.getSeconds() >= 10 ? nowDate.getSeconds().toString() : '0' + nowDate.getSeconds().toString();
      return hstr + ':' + mstr + ':' + sstr;
}





  // 计算小学年级
  calculateSchoolYearPrimarySchool = (gradeyear: number): string => {
      const nowDate = new Date();
      let nj = 0;
      if (nowDate.getMonth() + 1 >= 9) {
        nj = nowDate.getFullYear() - gradeyear + 1;
      } else {
         nj = nowDate.getFullYear() - gradeyear;
      }

      if (nj > 6) {
         return '小学毕业';
      } else if (nj <= 0) {
        return '未入学';
      } else {
        return nj.toString();
      }
  }

  // 计算学籍
  calculateGradeSchool = (schoolyear: number): number => {
       const nowDate = new Date();
       if (nowDate.getMonth() + 1 >= 9) {
          return nowDate.getFullYear() - schoolyear + 1;
       } else {
          return nowDate.getFullYear() - schoolyear ;
       }
  }



  // 计算初中
  calculateSchoolYearMiddleSchool = (gradeyear: number): string => {
    const nowDate = new Date();
    let nj = 0;
    if (nowDate.getMonth() + 1 >= 9) {
      nj = nowDate.getFullYear() - gradeyear + 1;
    } else {
      nj = nowDate.getFullYear() - gradeyear;
    }

    if (nj > 3) {
      return '初中毕业';
    } else if (nj <= 0) {
       return '未升初中';
    } else {
      return nj.toString();
    }
  }



}
