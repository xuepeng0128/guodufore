
import {District} from './District';
import {Employee} from './Employee';

export class School {
   schoolId: string; // 学校编号
   schoolName: string ; // 学校名称
   cityId: string;
   districtId: string;
   longitude: number; // 经度坐标
    latitude: number ; // 纬度坐标
    tel: string;
    linkMan: string;
    address: string; // 地址
    schoolStyle: number; // 1.小学，2.初中
  saleManId: string; // 业务员
    regTime: Date; // 注册时间
   train: boolean;


  constructor(options: { schoolId?: string, schoolName?: string, cityId?: string, districtId?: string,
                         longitude?: number, latitude?: number, tel?: string, linkMan?: string, address?: string,
                          schoolStyle?: number, saleManId?: string, regTime?: Date, train?: boolean} = {}) {
    this.schoolId = options.schoolId || '';
    this.schoolName = options.schoolName || '';
    this.cityId = options.cityId || '0';
    this.districtId = options.districtId || '0';
    this.longitude = options.longitude || 0;
    this.latitude = options.latitude || 0;
    this.tel = options.tel || '';
    this.linkMan = options.linkMan || '';
    this.address = options.address || '';
    this.schoolStyle = options.schoolStyle || 1;
    this.saleManId = options.saleManId || '';
    this.regTime = options.regTime ;
    this.train = options.train || false;
  }
}
