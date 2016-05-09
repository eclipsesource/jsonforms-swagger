import { ElementRef, SimpleChange, TemplateRef } from '@angular/core';
export declare class Carousel {
    private el;
    value: any[];
    numVisible: number;
    firstVisible: number;
    headerText: string;
    effectDuration: any;
    circular: boolean;
    breakpoint: number;
    responsive: boolean;
    autoplayInterval: number;
    easing: string;
    pageLinks: number;
    style: string;
    styleClass: string;
    itemTemplate: TemplateRef<any>;
    initialized: boolean;
    carouselElement: any;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
}
