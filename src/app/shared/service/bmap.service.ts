import {Injectable} from '@angular/core';
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
  cityPosData = [
    { cityId : '430100', cityName: '长沙' , longitude: 112.94 , latitude:	28.23},
    { cityId : '430200', cityName: '株洲' , longitude: 113.14 , latitude:	27.83},
    { cityId : '430300', cityName: '湘潭' , longitude: 112.95	 , latitude: 27.83},
    { cityId : '430400', cityName: '衡阳' , longitude: 112.57 , latitude:	26.91},
    { cityId : '430500', cityName: '邵阳' , longitude: 111.47	 , latitude: 27.24},
    { cityId : '430600', cityName: '岳阳' , longitude: 113.13	 , latitude: 29.36},
    { cityId : '430700', cityName: '常德' , longitude:	111.71 , latitude:	29.03},
    { cityId : '430800', cityName: '张家界' , longitude:	110.48 , latitude:	29.12},
    { cityId : '430900', cityName: '益阳' , longitude: 112.36 , latitude:	28.56},
    { cityId : '431000', cityName: '郴州' , longitude:	113.02 , latitude:	25.77},
    { cityId : '431100', cityName: '永州' , longitude:	111.61 , latitude:	26.42},
    { cityId : '431200', cityName: '怀化' , longitude:	110.01 , latitude:	27.57},
    { cityId : '431300', cityName: '娄底' , longitude:	112.01 , latitude:	27.71},
    { cityId : '433100', cityName: '湘西' , longitude:	109.74 , latitude:	28.31}
  ];



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
    // const geolocation = new BMap.Geolocation();
    //
    // geolocation.getCurrentPosition(function(r) {
    //   if (this.getStatus() === BMAP_STATUS_SUCCESS) {
    //     const mk = new BMap.Marker(r.point);
    //     map.addOverlay(mk);
    //     map.panTo(r.point);
    //   }
    //
    // }, {enableHighAccuracy: true});


  }

  // 根据选择的区域，确定地图中心点
  onSetMapCenter(areaid: string, lng?: string, lat?: string ) {
    if (areaid === '370000') {
      this.bMap.centerAndZoom(new BMap.Point(116.98, 36.67), 7);
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
        callback(null);
      }
    }, cityname || '济南市');
  }

  onGetPos = (callback: ( value: {lng: number, lat: number}) => void ) => {
    this.bMap.addEventListener('click', (e) => {
      callback({lng: parseFloat(e.point.lng), lat : parseFloat(e.point.lat)});
    });
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
