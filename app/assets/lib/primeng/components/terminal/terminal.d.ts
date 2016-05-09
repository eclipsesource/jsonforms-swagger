import { AfterViewInit, AfterViewChecked, EventEmitter, ElementRef } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class Terminal implements AfterViewInit, AfterViewChecked {
    private el;
    private domHandler;
    welcomeMessage: string;
    prompt: string;
    style: string;
    styleClass: string;
    responseChange: EventEmitter<any>;
    handler: EventEmitter<any>;
    commands: any[];
    command: string;
    container: any;
    commandProcessed: boolean;
    constructor(el: ElementRef, domHandler: DomHandler);
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    response: string;
    handleCommand(event: any, container: any): void;
    focus(element: any): void;
}
