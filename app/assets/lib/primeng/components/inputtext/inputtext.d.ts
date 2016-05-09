import { ElementRef } from '@angular/core';
import { NgModel } from '@angular/common';
export declare class InputText {
    private el;
    private control;
    hover: boolean;
    focus: boolean;
    constructor(el: ElementRef, control: NgModel);
    onMouseover(e: any): void;
    onMouseout(e: any): void;
    onFocus(e: any): void;
    onBlur(e: any): void;
    isDisabled(): any;
    isInvalid(): boolean;
}
