import { Accordion } from './accordion';
export declare class AccordionTab {
    private accordion;
    header: string;
    selected: boolean;
    disabled: boolean;
    headerFacet: any;
    constructor(accordion: Accordion);
    toggle(event: any): void;
    findTabIndex(): number;
}
