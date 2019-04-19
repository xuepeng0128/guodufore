// 树状化节点类
export class NzTreeNode {
  title: string;
  value: string;
  key: string;
  isLeaf: boolean;
  children: Array<NzTreeNode>;

  constructor(title?: string, value?: string, key?: string, isLeaf?: boolean, children?: Array<NzTreeNode>) {
    this.title = title;
    this.value = value;
    this.key = key;
    this.isLeaf = isLeaf || false;
    this.children = children;
  }
}
