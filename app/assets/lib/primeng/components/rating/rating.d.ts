import { EventEmitter } from '@angular/core';
export declare class Rating {
    value: number;
    disabled: boolean;
    readonly: boolean;
    stars: number;
    cancel: boolean;
    valueChange: EventEmitter<any>;
    onRate: EventEmitter<any>;
    onCancel: EventEmitter<any>;
    private starsArray;
    private hoverCancel;
    ngOnInit(): void;
    rate(event: any, i: number): void;
    clear(event: any): void;
}
