import { ElementRef, AfterViewInit, OnDestroy, OnChanges, SimpleChange } from '@angular/core';
export declare class Lightbox implements AfterViewInit, OnDestroy, OnChanges {
    private el;
    initialized: boolean;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
}
