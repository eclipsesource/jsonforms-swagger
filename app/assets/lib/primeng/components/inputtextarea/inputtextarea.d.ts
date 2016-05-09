import { ElementRef, OnInit } from '@angular/core';
import { NgModel } from '@angular/common';
export declare class InputTextarea implements OnInit {
    private el;
    private control;
    autoResize: boolean;
    rows: number;
    cols: number;
    hover: boolean;
    focus: boolean;
    rowsDefault: number;
    colsDefault: number;
    constructor(el: ElementRef, control: NgModel);
    ngOnInit(): void;
    onMouseover(e: any): void;
    onMouseout(e: any): void;
    onFocus(e: any): void;
    onBlur(e: any): void;
    isDisabled(): any;
    isInvalid(): boolean;
    onKeyup(e: any): void;
    resize(): void;
}
