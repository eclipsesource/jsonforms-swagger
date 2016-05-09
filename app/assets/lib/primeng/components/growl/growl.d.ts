import { ElementRef, SimpleChange } from '@angular/core';
import { Message } from '../api/message';
export declare class Growl {
    private el;
    sticky: boolean;
    life: number;
    value: Message[];
    initialized: boolean;
    constructor(el: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
}
