import { ElementRef, AfterViewInit, OnDestroy, EventEmitter, SimpleChange } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class Editor implements AfterViewInit, OnDestroy {
    private el;
    private domHandler;
    value: string;
    valueChange: EventEmitter<any>;
    onTextChange: EventEmitter<any>;
    toolbar: any;
    style: string;
    styleClass: string;
    selfChange: boolean;
    quill: any;
    constructor(el: ElementRef, domHandler: DomHandler);
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
}
