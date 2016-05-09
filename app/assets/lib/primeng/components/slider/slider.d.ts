import { ElementRef, AfterViewInit, OnDestroy, OnChanges, SimpleChange, EventEmitter } from '@angular/core';
export declare class Slider implements AfterViewInit, OnDestroy, OnChanges {
    private el;
    animate: boolean;
    disabled: boolean;
    min: number;
    max: number;
    orientation: string;
    value: number;
    values: number[];
    step: number;
    range: boolean;
    style: string;
    styleClass: string;
    onChange: EventEmitter<any>;
    valueChange: EventEmitter<any>;
    valuesChange: EventEmitter<any>;
    initialized: boolean;
    stopNgOnChangesPropagation: boolean;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
}
