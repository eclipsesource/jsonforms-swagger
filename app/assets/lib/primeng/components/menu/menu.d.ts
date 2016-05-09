import { ElementRef, SimpleChange } from '@angular/core';
export declare class Menu {
    private el;
    popup: boolean;
    trigger: any;
    my: string;
    at: string;
    triggerEvent: string;
    style: string;
    styleClass: string;
    initialized: boolean;
    menuElement: any;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
}
