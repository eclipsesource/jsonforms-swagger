import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { APIGenerator } from './api-generator';
import { ErrorService } from '../../error/error.service';

import { API } from '../model/api';
import { Action } from '../model/action';
import { Operation } from '../model/operation';

@Injectable()
export class APIManagerService {

	private jsonAPI:{};

	private _api = new BehaviorSubject<API>(null);
	api = this._api.asObservable();
	currentAPI: API;

	private _activeAction = new Subject<Action>();
	activeAction = this._activeAction.asObservable();
	currentActiveAction: Action;

	private _activeOperation = new Subject<Operation>();
	activeOperation = this._activeOperation.asObservable();

	private initialData:{} = {};

	constructor(private generator: APIGenerator, private errorService: ErrorService) {
	}

	generateAPI(url:string, apiModel: {}) {
		this.generator.getJSONAPI(url).subscribe(
			(jsonAPI) => {
				this.jsonAPI = jsonAPI;
				this.currentAPI = this.generator.generateAPI(this.jsonAPI, apiModel);
				this._api.next(this.currentAPI);
			},
			(error) => {
				console.log(error);
				this.errorService.showErrorMessage(error);
			}
		);
	}

	getCurrentAPI(): API {
		return this.currentAPI;
	}

	setActiveAction(action: Action) {
		this.currentActiveAction = action;
		this._activeAction.next(action);
		this.initialData = {};
		if (action && action.operations.length > 0) {
			this._activeOperation.next(action.operations[0]);
		} else {
			this._activeOperation.next(null);
		}
	}

	setActiveOperation(operation: Operation, initialData: {}) {
		if (operation && (!this.currentActiveAction || this.currentActiveAction.operations.indexOf(operation) < 0)) {
			let action: Action = this.currentAPI.getActionByOperation(operation); // may be undefined
			this.currentActiveAction = action;
			this._activeAction.next(action);
		}
		this.initialData = initialData;
		this._activeOperation.next(operation);
	}

	getInitialData(): {} {
		return this.initialData;
	}

	resetService() {
		this._api.next(null);
		this.initialData = {};
		this.jsonAPI = null;
	}


}
