import { ElementRef, AfterContentInit, OnDestroy, OnChanges, SimpleChange, EventEmitter } from '@angular/core';
export declare class InputSwitch implements AfterContentInit, OnDestroy, OnChanges {
    private el;
    onLabel: string;
    offLabel: string;
    checked: boolean;
    style: string;
    styleClass: string;
    onChange: EventEmitter<any>;
    checkedChange: EventEmitter<any>;
    initialized: boolean;
    stopNgOnChangesPropagation: boolean;
    inputSwitchElement: any;
    constructor(el: ElementRef);
    ngAfterContentInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
}
