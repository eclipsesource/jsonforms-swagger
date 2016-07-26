import { Component } from '@angular/core';

import { PanelMenu } from 'primeng/primeng';

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

	api: API;

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

}
