import { Component, Input, OnDestroy } from '@angular/core';

import { Draggable } from 'primeng/primeng';
import { Subscription } from 'rxjs/Subscription';

import {APIManagerService } from '../core/api-manager/api-manager.service';

import { API } from '../core/model/api';
import { Action } from '../core/model/action';
import { Operation } from '../core/model/operation';
import { SearchPipe } from '../common/search.pipe';

@Component({
	selector: 'explorer',
	moduleId: module.id,
	templateUrl: 'explorer.html',
	styleUrls: ['explorer.css', '../panel-menu.css'],
	pipes: [SearchPipe],
	directives: [Draggable]
})
export class ExplorerComponent implements OnDestroy {

	@Input() api: API;

	activeAction: Action;
	activeActionSubscription: Subscription;

	activeOperation: Operation;
	activeOperationSubscription: Subscription;

	private filter: string = '';

	constructor(private apiManagerService:APIManagerService) {
		this. activeActionSubscription = apiManagerService.activeAction.subscribe((activeAction: Action) => this.activeAction = activeAction);

		this.activeOperationSubscription = apiManagerService.activeOperation.subscribe((activeOperation: Operation) => this.activeOperation = activeOperation);
	}

	selectOperation(operation: Operation) {
		this.apiManagerService.setActiveOperation(operation, {});
	}

	isOperationActive(operation: Operation): boolean {
		return operation == this.activeOperation;
	}

	addOperationToActiveAction(operation: Operation) {
		if (this.activeAction) {
			if (this.activeAction.addOperation(operation)) {
				this.selectOperation(operation);
			}
		}
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

	ngOnDestroy() {
		this.activeActionSubscription.unsubscribe();
		this.activeOperationSubscription.unsubscribe();
	}
}

