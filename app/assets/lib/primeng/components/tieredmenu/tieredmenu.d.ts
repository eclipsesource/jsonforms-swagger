import { ElementRef, SimpleChange } from '@angular/core';
export declare class TieredMenu {
    private el;
    popup: boolean;
    trigger: any;
    my: string;
    at: string;
    triggerEvent: string;
    autoDisplay: boolean;
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
