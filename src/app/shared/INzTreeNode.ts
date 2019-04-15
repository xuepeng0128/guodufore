import {NzTreeNode} from 'ng-zorro-antd';

export interface INzTreeNode {
  // 树状化节点类
  title: string;
  value: string;
  key: string;
  isLeaf: boolean;
  children?: Array<INzTreeNode>;
}
