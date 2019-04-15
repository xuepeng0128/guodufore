
import {District} from './District';
import {Employee} from './Employee';

export class School {
   schoolId: string; // 学校编号
   schoolName: string ; // 学校名称
   district: District; // 区
   longitude: number; // 经度坐标
    latitude: number ; // 纬度坐标
    address: string; // 地址
    schoolStyle: string; // 1.小学，2.初中
    saleMan: Employee; // 业务员
    regTime: Date; // 注册时间
  constructor(options: {schoolId?: string, schoolName?: string,  district?: District,
                         longitude?: number, latitude?: number, address?: string, schoolStyle?: string; saleMan?: Employee, regTime?: Date}= {}) {
    this.schoolId = options.schoolId || '';
    this.schoolName = options.schoolName || '';
    this.district = options.district || null;
    this.longitude = options.longitude;
    this.latitude = options.latitude;
    this.address = options.address || '';
    this.schoolStyle = options.schoolStyle || '1';
    this.saleMan = options.saleMan;
    this.regTime = options.regTime || new Date();
  }
}
