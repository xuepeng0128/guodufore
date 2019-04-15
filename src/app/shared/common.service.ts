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

  calculate = (paperId: string): boolean => {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(paperId) === false) {
      return false;
    }
  }


  // 计算小学
  calculateGradePrimarySchool = (gradeyear: number): string => {
      const nowDate = new Date();
      let nj = 0;
      if (nowDate.getMonth() + 1 >= 9) {
        nj = nowDate.getFullYear() - gradeyear + 1;
      } else {
         nj = nowDate.getFullYear() - gradeyear;
      }

      if (nj > 6) {
         return '毕业';
      } else {
        return nj.toString();
      }
  }

  // 计算初中
  calculateGradeMiddleSchool = (gradeyear: number): string => {
    const nowDate = new Date();
    let nj = 0;
    if (nowDate.getMonth() + 1 >= 9) {
      nj = nowDate.getFullYear() - gradeyear + 1;
    } else {
      nj = nowDate.getFullYear() - gradeyear;
    }

    if (nj > 3) {
      return '毕业';
    } else {
      return nj.toString();
    }
  }



}
