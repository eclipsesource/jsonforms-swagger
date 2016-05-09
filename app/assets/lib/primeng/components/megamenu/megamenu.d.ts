import { ElementRef, SimpleChange } from '@angular/core';
export declare class MegaMenu {
    private el;
    autoDisplay: boolean;
    orientation: string;
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
