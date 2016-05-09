import { EventEmitter, TemplateRef } from '@angular/core';
import { TreeNode } from '../api/treenode';
export declare class Tree {
    value: TreeNode[];
    selectionMode: string;
    selection: any;
    selectionChange: EventEmitter<any>;
    onNodeSelect: EventEmitter<any>;
    onNodeUnselect: EventEmitter<any>;
    onNodeExpand: EventEmitter<any>;
    onNodeCollapse: EventEmitter<any>;
    style: string;
    styleClass: string;
    template: TemplateRef<any>;
    onNodeClick(event: any, node: any): void;
    findIndexInSelection(node: TreeNode): number;
    isSelected(node: TreeNode): boolean;
    isSingleSelectionMode(): boolean;
    isMultipleSelectionMode(): boolean;
}
