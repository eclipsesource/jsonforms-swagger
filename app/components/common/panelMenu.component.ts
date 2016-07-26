import {Component,Output,ElementRef,OnDestroy,Input,EventEmitter} from '@angular/core';
import {Location} from '@angular/common';
import {Draggable, Droppable} from 'primeng/primeng';

export interface MenuItem {
    label?: string;
    icon?: string;
    command?: (event?: any) => void;
    url?: string;
    eventEmitter?: EventEmitter<any>;
    items?: MenuItem[];
}
//!child.items ? droppable : null
@Component({
    selector: 'panelMenuSub',
    template: `
        <ul class="ui-menu-list ui-helper-reset" [style.display]="expanded ? 'block' : 'none'">
            <li (onDragOver)="onhover($event)" (onDragStart)="testDragStart($event)" [pDraggable]="draggableAttr(child)" [pDroppable]="droppableAttr(child)" (onDrop)="test()" *ngFor="let child of item.items" class="ui-menuitem ui-corner-all" [ngClass]="{'ui-menu-parent':child.items}">
                <a #link [href]="child.url||'#'" class="ui-menuitem-link ui-corner-all"
                    [ngClass]="{'ui-menuitem-link-hasicon':child.icon&&child.items,'ui-state-hover':(hoveredLink==link)}" (click)="onClick($event,child)"
                    (mouseenter)="hoveredLink=link" (mouseleave)="hoveredLink=null">
                    <span class="ui-panelmenu-icon fa fa-fw" [ngClass]="{'fa-caret-right':!isActive(child),'fa-caret-down':isActive(child)}" *ngIf="child.items"></span>
                    <span class="ui-menuitem-icon fa fa-fw" [ngClass]="child.icon" *ngIf="child.icon"></span>
                    <span class="ui-menuitem-text">{{child.label}}</span>
                </a>
                <panelMenuSub [item]="child" [expanded]="isActive(child)" *ngIf="child.items"></panelMenuSub>
            </li>
        </ul>
    `,
    directives: [PanelMenuSub, Draggable, Droppable]
})
export class PanelMenuSub {

    @Input() draggable: string = null;
    @Input() droppable: string = null;

    @Input() item: MenuItem;

    @Input() expanded: boolean;

    @Output() onDrop = new EventEmitter();

    constructor() {}

    activeItems: MenuItem[] = [];

    onClick(event,item: MenuItem) {
        if(item.items) {
            let index = this.activeItems.indexOf(item);

            if(index == -1)
                this.activeItems.push(item);
            else
                this.activeItems.splice(index, 1);

            event.preventDefault();
        }
        else {
            if(!item.url) {
                event.preventDefault();
            }

            if(item.command) {
                if(!item.eventEmitter) {
                    item.eventEmitter = new EventEmitter();
                    item.eventEmitter.subscribe(item.command);
                }

                item.eventEmitter.emit(event);
            }
        }
    }

    isActive(item: MenuItem): boolean {
        return this.activeItems.indexOf(item) != -1;
    }
    test(){
        console.log('sdflkasdjflkasjdfljk');
    }

    testDragStart(e){
        console.log('dragstart', e);
    }
    onhover(e){
        console.log('onhover', e);
    }

    draggableAttr(child): string{
        let res = null;
        if(!child.items){
            res = this.draggable;
        }
        //console.log('draggable', res);
        return res;
    }
    droppableAttr(child): string{
        let res = null;
        if(!child.items){
            res = this.droppable;
        }
        //console.log('droppable', res);
        return res;
    }


}

@Component({
    selector: 'panelMenu',
    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'ui-panelmenu ui-widget'">
            <div *ngFor="let item of model" class="ui-panelmenu-panel">
                <div tabindex="0" [ngClass]="{'ui-widget ui-panelmenu-header ui-state-default':true,'ui-corner-all':!isActive(item),
                    'ui-state-active ui-corner-top':isActive(item),'ui-state-hover':(item == hoveredItem)}" (click)="headerClick($event,item)">
                    <span class="ui-panelmenu-icon fa fa-fw" [ngClass]="{'fa-caret-right':!isActive(item),'fa-caret-down':isActive(item)}"></span>
                    <a [href]="item.url||'#'" [ngClass]="{'ui-panelmenu-headerlink-hasicon':item.icon}"
                        (mouseenter)="hoveredItem=item" (mouseleave)="hoveredItem=null">
                        <span class="ui-menuitem-icon fa fa-fw" [ngClass]="item.icon" *ngIf="item.icon"></span>
                        <span>{{item.label}}</span>
                    </a>
                </div>
                <div class="ui-panelmenu-content ui-widget-content" [style.display]="isActive(item) ? 'block' : 'none'">
                    <panelMenuSub [draggable]="draggable" [droppable]="droppable" (onDrop)="onDrop.emit($event)" [item]="item" [expanded]="true"></panelMenuSub>
                </div>
            </div>
        </div>
    `,
    directives: [PanelMenuSub]
})
export class PanelMenu {

    @Input() draggable: string = null;
    @Input() droppable: string = null;

    @Input() model: MenuItem[];

    @Input() style: any;

    @Input() styleClass: string;

    @Output() onDrop = new EventEmitter();

    activeItems: MenuItem[];

    constructor(private el: ElementRef) {
        this.activeItems = [];
    }

    headerClick(event, item ) {
        let index = this.activeItems.indexOf(item);

        if(index == -1)
            this.activeItems.push(item);
        else
            this.activeItems.splice(index, 1);

        event.preventDefault();
    }

    unsubscribe(item: any) {
        if(item.eventEmitter) {
            item.eventEmitter.unsubscribe();
        }

        if(item.items) {
            for(let childItem of item.items) {
                this.unsubscribe(childItem);
            }
        }
    }

    isActive(item: MenuItem): boolean {
        return this.activeItems.indexOf(item) != -1;
    }

    ngOnDestroy() {
        if(this.model) {
            for(let item of this.model) {
                this.unsubscribe(item);
            }
        }
    }

}