export class Menu {
   menuId: string;
  menuName: string;
  pareMenuId: string;
  url: string;
  icon: string;
  power: string;
   paixu: number;
  kind: number; // 1.公司 ，2.学校，3.机构

  subMenus: Array<Menu>  ; // 子菜单

  constructor(options: {menuId?: string, menuName?: string, pareMenuId?: string , url?: string, icon?: string,
                         power?: string, paixu?: number, kind?: number, subMenus?: Array<Menu>}= {}) {
    this.menuId = options.menuId;
    this.menuName = options.menuName;
    this.pareMenuId = options.pareMenuId;
    this.url = options.url;
    this.icon = options.icon;
    this.paixu = options.paixu;
    this.kind = options.kind;
    this.subMenus = options.subMenus;
  }
}
