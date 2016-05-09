import { ElementRef, AfterViewInit, OnDestroy, DoCheck, Renderer, EventEmitter, IterableDiffers, TemplateRef } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class DataScroller implements AfterViewInit, DoCheck, OnDestroy {
    private el;
    private renderer;
    private domHandler;
    value: any[];
    rows: number;
    lazy: boolean;
    onLazyLoad: EventEmitter<any>;
    style: string;
    styleClass: string;
    buffer: number;
    inline: boolean;
    scrollHeight: any;
    header: any;
    footer: any;
    itemTemplate: TemplateRef<any>;
    loader: any;
    private dataToRender;
    private first;
    differ: any;
    scrollFunction: any;
    contentElement: any;
    constructor(el: ElementRef, differs: IterableDiffers, renderer: Renderer, domHandler: DomHandler);
    ngAfterViewInit(): void;
    ngDoCheck(): void;
    load(): void;
    isEmpty(): boolean;
    createLazyLoadMetadata(): any;
    bindScrollListener(): void;
    ngOnDestroy(): void;
}