import {Injectable} from '@angular/core';
import {from} from 'rxjs';

declare var BMap: any;
declare var BMAP_NORMAL_MAP: any;
declare var BMAP_HYBRID_MAP: any;
declare var BMAP_POINT_SIZE_SMALL: any;
declare var BMAP_POINT_SHAPE_STAR: any;
declare var BMAP_STATUS_SUCCESS: any;
@Injectable({
  providedIn: 'root'
})
export class BMapService {
   bMap: any;
  constructor() { }

  // 初始化地图
  initMap(divMap: string) {
    this.bMap = new BMap.Map(divMap);    // 创建Map实例
    this.bMap .centerAndZoom(new BMap.Point(111.63, 26.22), 7);  // 初始化地图,设置中心点坐标和地图级别(以永州为中心)
    // 添加地图类型控件
    this.bMap .addControl(new BMap.MapTypeControl({
      mapTypes: [
        BMAP_NORMAL_MAP,
        BMAP_HYBRID_MAP
      ]}));
    this.bMap .setCurrentCity('长沙');          // 设置地图显示的城市 此项是必须设置的
    this.bMap .enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放




    // 根据 ip定位
    const geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
      if (this.getStatus() === BMAP_STATUS_SUCCESS) {
        const mk = new BMap.Marker(r.point);
        this.bMap.addOverlay(mk);
        this.bMap.panTo(r.point);
      }

    }, {enableHighAccuracy: true});


  }

  // 根据选择的区域，确定地图中心点
  onSetMapCenter(areaid: string, lng?: string, lat?: string ) {
    if (areaid === '430000') {
      this.bMap.centerAndZoom(new BMap.Point(111.63, 26.22), 7);
    } else if (areaid.substring(4, 6) === '00' ) {
      this.bMap.centerAndZoom(new BMap.Point(parseFloat(lng), parseFloat(lat)), 11);
    } else {
      this.bMap.centerAndZoom(new BMap.Point(parseFloat(lng), parseFloat(lat)), 14);
    }
  }




  // 地址解析
  // 将地址解析结果显示在地图上,并调整地图视野
  onAddressAnalisys(address: string, cityname: string, callback: ( value: {lng: number, lat: number}) => void) {
          const myGeo = new BMap.Geocoder();
          myGeo.getPoint(address, point => {
              if (point) {
                this.bMap.centerAndZoom(point, 16);
                // this.bMap.addOverlay(new BMap.Marker(point));
                callback({lng: parseFloat(point.lng), lat : parseFloat(point.lat)});
              } else {
                alert('您选择地址没有解析到结果!');
              }
            }, cityname || '长沙市');
  }



// ---------------------------- 计算坐标间的距离--------------------------//
 toRad(d) {  return d * Math.PI / 180; }

 getDisance(lat1, lng1, lat2, lng2) { //  lat为纬度, lng为经度;

    let dis = 0;
    const radLat1 = this.toRad(lat1);

    const radLat2 = this.toRad(lat2);

    const deltaLat = radLat1 - radLat2;

    const deltaLng = this.toRad(lng1) - this.toRad(lng2);

   dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));

    return dis * 6378137;

  }



}
