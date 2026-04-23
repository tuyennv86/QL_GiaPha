export interface BaseNode {
  id: number;
  parent_id: number | null;
  sort_order?: number;
}

export type TreeNode<T> = T & { children: TreeNode<T>[] };

export class TreeUtil {
  static buildTree<T extends BaseNode>(items: T[]): TreeNode<T>[] {
    const map = new Map<number, TreeNode<T>>();

    // tạo node + children
    items.forEach((item) => {
      map.set(item.id, { ...item, children: [] });
    });

    const roots: TreeNode<T>[] = [];

    map.forEach((node) => {
      if (node.parent_id && map.has(node.parent_id)) {
        map.get(node.parent_id)!.children.push(node);
      } else {
        // parent null hoặc không tồn tại → root
        roots.push(node);
      }
    });

    // sort (nếu có sort_order)
    const sortTree = (nodes: TreeNode<T>[]) => {
      nodes.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
      nodes.forEach((n) => sortTree(n.children));
    };

    sortTree(roots);

    return roots;
  }
}
