import { TreeTable } from './treetable';
import { TreeNode } from '../api/treenode';
export declare class UITreeRow {
    private treeTable;
    node: TreeNode;
    level: number;
    expanded: boolean;
    hover: boolean;
    constructor(treeTable: TreeTable);
    toggle(event: any): void;
    isLeaf(): boolean;
    isSelected(): boolean;
    onRowClick(event: any): void;
}
