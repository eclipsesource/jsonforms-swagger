import { EventEmitter } from '@angular/core';
export declare class Paginator {
    rows: number;
    first: number;
    pageLinkSize: number;
    onPageChange: EventEmitter<any>;
    style: string;
    styleClass: string;
    pageLinks: number[];
    _totalRecords: number;
    totalRecords: number;
    isFirstPage(): boolean;
    isLastPage(): boolean;
    getPageCount(): number;
    calculatePageLinkBoundaries(): number[];
    updatePageLinks(): void;
    changePage(p: number): void;
    getPage(): number;
    changePageToFirst(): void;
    changePageToPrev(): void;
    changePageToNext(): void;
    changePageToLast(): void;
}
