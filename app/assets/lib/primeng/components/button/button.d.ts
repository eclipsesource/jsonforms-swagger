import { ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class Button implements AfterViewInit, OnDestroy {
    private el;
    private domHandler;
    icon: string;
    iconPos: string;
    label: string;
    private hover;
    private focus;
    private active;
    constructor(el: ElementRef, domHandler: DomHandler);
    ngAfterViewInit(): void;
    onMouseover(e: any): void;
    onMouseout(e: any): void;
    onMouseDown(e: any): void;
    onMouseUp(e: any): void;
    onFocus(e: any): void;
    onBlur(e: any): void;
    isDisabled(): any;
    getStyleClass(): string;
    ngOnDestroy(): void;
}
