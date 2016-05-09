import { EventEmitter } from '@angular/core';
import { SelectItem } from '../api/selectitem';
export declare class SelectButton {
    options: SelectItem[];
    tabindex: number;
    multiple: boolean;
    value: any;
    style: string;
    styleClass: string;
    valueChange: EventEmitter<any>;
    onChange: EventEmitter<any>;
    private hoveredItem;
    onItemClick(event: any, option: SelectItem): void;
    isSelected(option: SelectItem): boolean;
    findItemIndex(option: SelectItem): number;
}
