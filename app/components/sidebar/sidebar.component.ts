import { Component, Input, ViewChild } from '@angular/core';

import { PanelMenu, OverlayPanel } from 'primeng/primeng';
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

	@Input() api: API;

	@ViewChild('op') op:OverlayPanel;

	moreInfoActive:boolean = false;
	moreInfoTimeoutId:Timer = null;

	activeAction:Action;

	constructor(private apiManagerService:APIManagerService) {
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

}
