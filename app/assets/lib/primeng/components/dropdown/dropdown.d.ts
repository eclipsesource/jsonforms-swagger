import { ElementRef, SimpleChange, EventEmitter, TemplateRef } from '@angular/core';
import { SelectItem } from '../api/selectitem';
export declare class Dropdown {
    private el;
    options: SelectItem[];
    value: any;
    valueChange: EventEmitter<any>;
    onChange: EventEmitter<any>;
    scrollHeight: number;
    filter: boolean;
    filterMatchMode: string;
    style: string;
    styleClass: string;
    itemTemplate: TemplateRef<any>;
    initialized: boolean;
    selectElement: any;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
}
