import { Component } from '@angular/core';

import { PanelMenu, MenuItem } from '../common/panelMenu.component';

import {APIManagerService } from '../core/api-manager/api-manager.service';

import { API } from '../core/model/api';
import { Operation } from '../core/model/operation';


@Component({
	selector: 'explorer',
	moduleId: module.id,
	templateUrl: 'explorer.html',
	styleUrls: ['explorer.css'],
	directives: [PanelMenu]
})
export class ExplorerComponent {
	private items: MenuItem[] = [];

	api: API;
	private filter: string = '';

	activeOperation: Operation;

	constructor(private apiManagerService:APIManagerService) {
		apiManagerService.api.subscribe((api: API) => {
			this.api = api;
			if(this.api){
				this.generatePanelItems();
			}
		});

		apiManagerService.activeOperation.subscribe((activeOperation: Operation) => this.activeOperation = activeOperation);
	}

	selectOperation(operation: Operation) {
		this.apiManagerService.setActiveOperation(operation, {});
	}

	isOperationActive(operation: Operation): boolean {
		return operation == this.activeOperation;
	}


	generatePanelItems(){
		this.items = [];
		this.api.tags.forEach((tag: string)=>{
			this.items.push({
				'label': tag,
				'items': this.generateTagOperations(tag)
			});
		});
	}

	generateTagOperations(tag: string):any[]{
		let operations: Operation[] = this.api.getOperationsByTag(tag);
		let operationItems: any[] = [];
		operations.filter((operation)=>{
			return operation.getTypeAndPath().includes(this.filter);
		}).forEach((operation: Operation)=>{
			operationItems.push({
				'label': operation.getTypeAndPath(),
				'command': (event) => {
					this.selectOperation(operation);
				}
			});
		});
		return operationItems;
	}

	changedSearch(value){
		this.filter = value;
		this.generatePanelItems();
	}

}

/*
<input #searchFilter type="text" />
<div *ngFor="let tag of api.tags">
<div class="tagGroup"><span>{{tag}}</span></div>
<div>
		<ul>
				<li class="tagOperation" *ngFor="let operation of api.getOperationsByTag(tag) | search: searchFilter.value" [ngClass]="{'active': isOperationActive(operation)}">
<a (click)="selectOperation(operation)">{{operation.getTypeAndPath()}}</a>
</li>
</ul>
</div>
</div>
*/
