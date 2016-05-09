import { ElementRef, AfterContentInit, OnDestroy, OnChanges, SimpleChange, EventEmitter } from '@angular/core';
export declare class Calendar implements AfterContentInit, OnChanges, OnDestroy {
    private el;
    value: string;
    valueChange: EventEmitter<any>;
    readonlyInput: boolean;
    style: string;
    styleClass: string;
    placeholder: string;
    inline: boolean;
    showAnim: string;
    dateFormat: string;
    showButtonPanel: boolean;
    monthNavigator: boolean;
    yearNavigator: boolean;
    numberOfMonths: number;
    showWeek: boolean;
    showOtherMonths: boolean;
    selectOtherMonths: boolean;
    defaultDate: any;
    minDate: any;
    maxDate: any;
    disabled: any;
    onSelect: EventEmitter<any>;
    hovered: boolean;
    focused: boolean;
    initialized: boolean;
    stopNgOnChangesPropagation: boolean;
    constructor(el: ElementRef);
    ngAfterContentInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
}
