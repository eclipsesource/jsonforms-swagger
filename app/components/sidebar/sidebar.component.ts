import { Component, ViewChild, Input, OnDestroy } from '@angular/core';

import { OverlayPanel} from 'primeng/primeng';
import {Droppable} from 'primeng/primeng';
import Timer = NodeJS.Timer;
import { Subscription } from 'rxjs/Subscription';

import {APIManagerService } from '../core/api-manager/api-manager.service';

import { API } from '../core/model/api';
import { EntityType } from '../core/model/entity-type';
import { Action } from '../core/model/action';

@Component({
	selector: 'sidebar',
	moduleId: module.id,
	templateUrl: 'sidebar.html',
	styleUrls: ['sidebar.css', '../panel-menu.css'],
	directives: [OverlayPanel, Droppable]
})
export class SidebarComponent implements OnDestroy {

	@Input() api: API;

	@ViewChild('op') op:OverlayPanel;

	moreInfoActive:boolean = false;
	moreInfoTimeoutId:Timer = null;

	activeAction:Action;
	activeActionSubscription: Subscription;

	constructor(private apiManagerService:APIManagerService) {
		this.activeActionSubscription = apiManagerService.activeAction.subscribe((activeAction:Action) => this.activeAction = activeAction);
	}

	selectAction(action:Action) {
		if (!this.isActionActive(action)) {
			this.apiManagerService.setActiveAction(action);
		}
	}

	isActionActive(action:Action):boolean {
		return action == this.activeAction;
	}

	removeAction(entityType: EntityType, action: Action) {
		if (entityType.removeAction(action)) {
			this.apiManagerService.setActiveAction(null);
		}
	}

	descriptionHoverIn($event:any, infoTarget:any) {
		if(!this.op){
			return;
		}
		if (this.moreInfoActive) {
			if (this.moreInfoTimeoutId) {
				clearTimeout(this.moreInfoTimeoutId);
				this.moreInfoTimeoutId = null;
			}
		} else {
			this.op.show($event, infoTarget);
			this.moreInfoActive = true;
		}
	}

	descriptionHoverOut($event:any) {
		if(!this.op){
			return;
		}
		this.moreInfoTimeoutId = setTimeout(()=> {
			this.op.hide();
			this.moreInfoTimeoutId = null;
			this.moreInfoActive = false;
		}, 1000);
	}

	active:boolean[] = [];
	hover:boolean[] = [];

	onClickMenu(menu: string) {
		this.active[menu] = !this.active[menu];
	}

	isActiveMenu(menu: string):boolean {
		return this.active[menu];
	}

	hoveringMenu(menu: string, state:boolean) {
		this.hover[menu] = state;
	}

	isHoverMenu(menu: string):boolean {
		return this.hover[menu];
	}

	newOperationDropped(event){
		console.log(event);
	}
	test(){
		console.log('f');
	}

	ngOnDestroy() {
		this.activeActionSubscription.unsubscribe();
	}
}
