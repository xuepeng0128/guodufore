import { District } from './District';

import { Employee } from './Employee';
import {TrainSchoolStyle} from './TrainSchoolStyle';

export class TrainSchool {
    trainSchoolId: string; // 培训学校编号
    trainSchoolName: string; // 培训学校名称
    trainSchoolStyle: TrainSchoolStyle;
    district: District ; // 区
    longitude: number; // 经度坐标
    latitude: number; // 纬度坐标
    address: string; // 地址
    saleMans: Employee; // 业务员


  constructor(trainSchoolId: string, trainSchoolName: string,
              trainSchoolStyle: TrainSchoolStyle, district: District, longitude: number, latitude: number, address: string, saleMans: Employee) {
    this.trainSchoolId = trainSchoolId;
    this.trainSchoolName = trainSchoolName;
    this.trainSchoolStyle = trainSchoolStyle;
    this.district = district;
    this.longitude = longitude;
    this.latitude = latitude;
    this.address = address;
    this.saleMans = saleMans;
  }
}
