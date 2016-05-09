import { ElementRef, EventEmitter } from '@angular/core';
import { AccordionTab } from './accordiontab';
export declare class Accordion {
    private el;
    multiple: boolean;
    onClose: EventEmitter<any>;
    onOpen: EventEmitter<any>;
    style: string;
    styleClass: string;
    tabs: AccordionTab[];
    constructor(el: ElementRef);
    addTab(tab: AccordionTab): void;
}
