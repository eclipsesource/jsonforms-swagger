import { Component } from '@angular/core';

import {APIManagerService } from '../core/api-manager/api-manager.service';

import { API } from '../core/model/api';
import { Operation } from '../core/model/operation';
import {SearchPipe} from '../common/search.pipe';

import {Draggable} from 'primeng/primeng';

@Component({
	selector: 'explorer',
	moduleId: module.id,
	templateUrl: 'explorer.html',
	styleUrls: ['explorer.css', '../panel-menu.css'],
	pipes: [SearchPipe],
	directives: [Draggable]
})
export class ExplorerComponent {

	api: API;
	private filter: string = '';

	activeOperation: Operation;

	constructor(private apiManagerService:APIManagerService) {
		apiManagerService.api.subscribe((api: API) => {
			this.api = api;
		});

		apiManagerService.activeOperation.subscribe((activeOperation: Operation) => this.activeOperation = activeOperation);
	}

	selectOperation(operation: Operation) {
		this.apiManagerService.setActiveOperation(operation, {});
	}

	isOperationActive(operation: Operation): boolean {
		return operation == this.activeOperation;
	}

	changedSearch(value){
		this.filter = value;
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
}

