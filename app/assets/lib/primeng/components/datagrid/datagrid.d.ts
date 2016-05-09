import { ElementRef, AfterViewInit, DoCheck, EventEmitter, IterableDiffers, TemplateRef } from '@angular/core';
export declare class DataGrid implements AfterViewInit, DoCheck {
    private el;
    value: any[];
    paginator: boolean;
    rows: number;
    columns: number;
    totalRecords: number;
    pageLinks: number;
    lazy: boolean;
    onLazyLoad: EventEmitter<any>;
    style: string;
    styleClass: string;
    header: any;
    footer: any;
    itemTemplate: TemplateRef<any>;
    private dataToRender;
    private first;
    private page;
    differ: any;
    constructor(el: ElementRef, differs: IterableDiffers);
    ngAfterViewInit(): void;
    ngDoCheck(): void;
    updatePaginator(): void;
    paginate(event: any): void;
    updateDataToRender(datasource: any): void;
    isEmpty(): boolean;
    createLazyLoadMetadata(): any;
}
