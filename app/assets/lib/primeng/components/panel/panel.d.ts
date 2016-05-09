import { EventEmitter } from '@angular/core';
export declare class Panel {
    toggleable: boolean;
    header: string;
    collapsed: boolean;
    style: string;
    styleClass: string;
    onBeforeToggle: EventEmitter<any>;
    onAfterToggle: EventEmitter<any>;
    private hoverToggler;
    toggle(event: any): void;
    expand(event: any): void;
    collapse(event: any): void;
}
