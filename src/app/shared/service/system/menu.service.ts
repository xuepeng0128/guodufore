import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {Menu} from '../../../entity/Menu';
import {isNullOrUndefined} from 'util';
import {map} from 'rxjs/operators';
import {NzTreeNode} from '../../../entity/NzTreeNode';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private httpsvr: HttpService) { }


  loadSupperAdminMenu = (): Observable<Array<Menu>> => {
    return this.httpsvr.onHttpGet('api/system/menu/menuList', {kind: 1 }).pipe(
      map( re => {
         const m = this.toTreeMenu(re, '0');
         return m;
      }

      )
    );
  }
 loadEmployeeMenu = (): Observable<Array<Menu>> => {
   return this.httpsvr.onHttpGet('api/system/menu/menuList', {kind: 1 }).pipe(
     map( (re: Array<Menu>) =>
         re.filter(o => o.menuId.substring(0, 2) !== '08' && o.menuId.substring(0, 2) !== '09')
     ),
     map( re => this.toTreeMenu(re, '0'))
   );
 }
loadSchoolAdminMenu = (): Observable<Array<Menu>> => {
  return this.httpsvr.onHttpGet('api/system/menu/menuList', {kind: 2}).pipe(
    map( re =>
      this.toTreeMenu(re, '0')
    )
  );
}
 loadTeacherMenu = () => {
    return this.httpsvr.onHttpGet('api/system/menu/menuList', {kind: 2}).pipe(
      map( (re: Array<Menu>) =>
        re.filter(o => o.menuId.substring(0, 2) !== '08' && o.menuId.substring(0, 2) !== '09')
      ),
      map( re =>
        this.toTreeMenu(re, '0')
      )
    );
  }



  // 树状化菜单
  toTreeMenu = (menuList: Array<Menu>, topMenuId: string): Array<Menu> => {
    const menuArray =  menuList.filter(o => o.pareMenuId === topMenuId);
    menuArray.forEach(v => {
      v.subMenus = this.toTreeMenu(menuList, v.menuId);
    });
    return menuArray;
  }

  // 可选择的树状化菜单
  toTreeSelectMenu = (treeMenuArray: Array<Menu>): Array<NzTreeNode>  => {
    const treeNodeArray: Array<NzTreeNode> = new Array<NzTreeNode>();
    treeMenuArray.forEach((v, k) => {
      const nowNode: NzTreeNode = new NzTreeNode(v.menuName, v.menuId, v.menuId);
      if (isNullOrUndefined(v.subMenus) || v.subMenus.length === 0) {
        nowNode.isLeaf = true;
      } else {
        nowNode.children = this.toTreeSelectMenu(v.subMenus);
      }
      treeNodeArray.push(nowNode);
    });
    return treeNodeArray;
  }


}
