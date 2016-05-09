import { Tree } from '../tree/tree';
import { TreeNode } from '../api/treenode';
export declare class UITreeNode {
    private tree;
    static ICON_CLASS: string;
    node: TreeNode;
    hover: boolean;
    expanded: boolean;
    constructor(tree: Tree);
    getIcon(): string;
    isLeaf(): boolean;
    toggle(event: any): void;
    onNodeClick(event: any): void;
    isSelected(): boolean;
}
