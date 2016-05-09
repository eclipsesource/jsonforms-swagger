import { ElementRef, EventEmitter, QueryList } from '@angular/core';
import { TabPanel } from './tabpanel';
export declare class TabView {
    private el;
    orientation: string;
    style: string;
    styleClass: string;
    onChange: EventEmitter<any>;
    onClose: EventEmitter<any>;
    initialized: boolean;
    tabs: TabPanel[];
    constructor(el: ElementRef, tabPanels: QueryList<TabPanel>);
    open(event: any, tab: TabPanel): void;
    close(event: any, tab: TabPanel): void;
    findSelectedTab(): TabPanel;
    findTabIndex(tab: TabPanel): number;
    getDefaultHeaderClass(tab: TabPanel): string;
}
