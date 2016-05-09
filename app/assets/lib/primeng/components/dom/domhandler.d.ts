export declare class DomHandler {
    addClass(element: any, className: string): void;
    addMultipleClasses(element: any, className: string): void;
    removeClass(element: any, className: string): void;
    hasClass(element: any, className: string): boolean;
    siblings(element: any): any;
    find(element: any, selector: string): any[];
    findSingle(element: any, selector: string): any;
    index(element: any): number;
    relativePosition(element: any, target: any): void;
    absolutePosition(element: any, target: any): void;
    getHiddenElementOuterHeight(element: any): number;
    scrollInView(container: any, item: any): void;
    getOuterHeight(element: any): number;
    fadeIn(element: any, duration: number): void;
    getWindowScrollTop(): number;
}
