import { ElementRef, TemplateRef } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class OrderList {
    private el;
    private domHandler;
    value: any[];
    header: string;
    style: string;
    styleClass: string;
    listStyle: string;
    responsive: boolean;
    itemTemplate: TemplateRef<any>;
    constructor(el: ElementRef, domHandler: DomHandler);
    onMouseover(event: any): void;
    onMouseout(event: any): void;
    onClick(event: any): void;
    findListItem(element: any): any;
    onItemClick(event: any, item: any): void;
    moveUp(listElement: any): void;
    moveTop(listElement: any): void;
    moveDown(listElement: any): void;
    moveBottom(listElement: any): void;
    getSelectedListElements(listElement: any): any[];
}
