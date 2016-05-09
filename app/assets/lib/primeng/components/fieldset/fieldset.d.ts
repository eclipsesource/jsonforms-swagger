import { EventEmitter } from '@angular/core';
export declare class Fieldset {
    legend: string;
    toggleable: boolean;
    collapsed: boolean;
    onBeforeToggle: EventEmitter<any>;
    onAfterToggle: EventEmitter<any>;
    style: string;
    styleClass: string;
    private hover;
    onLegendMouseenter(event: any): void;
    onLegendMouseleave(event: any): void;
    toggle(event: any): void;
    expand(event: any): void;
    collapse(event: any): void;
}
