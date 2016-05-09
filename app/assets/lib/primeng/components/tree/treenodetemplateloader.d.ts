import { OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
export declare class TreeNodeTemplateLoader implements OnInit {
    private viewContainer;
    node: any;
    template: TemplateRef<any>;
    constructor(viewContainer: ViewContainerRef);
    ngOnInit(): void;
}
