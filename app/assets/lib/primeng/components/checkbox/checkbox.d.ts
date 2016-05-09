import { EventEmitter } from '@angular/core';
export declare class Checkbox {
    value: any;
    name: string;
    disabled: boolean;
    model: any;
    checked: any;
    onChange: EventEmitter<any>;
    modelChange: EventEmitter<any>;
    checkedChange: EventEmitter<any>;
    hover: boolean;
    onClick(input: any): void;
    isChecked(value: any): any;
    removeValue(value: any): void;
    addValue(value: any): void;
    findValueIndex(value: any): number;
}
