import { OnInit, OnDestroy, EventEmitter, Renderer, ElementRef } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class OverlayPanel implements OnInit, OnDestroy {
    private el;
    private domHandler;
    private renderer;
    dismissable: boolean;
    showCloseIcon: boolean;
    style: string;
    styleClass: string;
    onBeforeShow: EventEmitter<any>;
    onAfterShow: EventEmitter<any>;
    onBeforeHide: EventEmitter<any>;
    onAfterHide: EventEmitter<any>;
    visible: boolean;
    hoverCloseIcon: boolean;
    documentClickListener: any;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer);
    ngOnInit(): void;
    show(event: any, target?: any): void;
    hide(): void;
    onCloseClick(event: any): void;
    ngOnDestroy(): void;
}
