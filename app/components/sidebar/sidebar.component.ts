import { Component, ViewChild } from '@angular/core';

import { OverlayPanel} from 'primeng/primeng';
import {PanelMenu, MenuItem} from '../common/panelMenu.component';
import Timer = NodeJS.Timer;

import {APIManagerService } from '../core/api-manager/api-manager.service';

import { API } from '../core/model/api';
import { EntityType } from '../core/model/entity-type';
import { Action } from '../core/model/action';

@Component({
	selector: 'sidebar',
	moduleId: module.id,
	templateUrl: 'sidebar.html',
	styleUrls: ['sidebar.css'],
	directives: [PanelMenu, OverlayPanel]
})
export class SidebarComponent {

	private items: MenuItem[] = [];
	api: API;

	@ViewChild('op') op:OverlayPanel;

	moreInfoActive:boolean = false;
	moreInfoTimeoutId:Timer = null;

	activeAction:Action;

	constructor(private apiManagerService:APIManagerService) {
		apiManagerService.api.subscribe((api: API) => {
			this.api = api;
			if(this.api){
				this.generatePanelItems();
			}
		});

		apiManagerService.activeAction.subscribe((activeAction:Action) => this.activeAction = activeAction);
	}

	selectAction(action:Action) {
		this.apiManagerService.setActiveAction(action);
	}

	isActionActive(action:Action):boolean {
		return action == this.activeAction;
	}

	descriptionHoverIn($event:any, infoTarget:any) {
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
		this.moreInfoTimeoutId = setTimeout(()=> {
			this.op.hide();
			this.moreInfoTimeoutId = null;
			this.moreInfoActive = false;
		}, 1000);
	}

	generatePanelItems(){
		this.items = [];

		this.api.entityTypes.forEach((entityType: EntityType)=>{
			this.items.push({
				'label': entityType.name,
				'items': this.generateEntityActions(entityType)
			});
		});
	}

	generateEntityActions(entityType: EntityType):any[]{
		let actions: any[] = [];
		entityType.actions.forEach((action)=>{
			actions.push({
				'label': action.name,
				'command': (event) => {
					this.selectAction(action);
				}
			});
		});
		return actions;
	}

	addOperation($event){
		console.log($event);
	}
}
