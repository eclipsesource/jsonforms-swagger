import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { APIGeneratorService } from '../api-generator/api-generator.service';

import { API } from '../model/api';
import { Action } from '../model/action';
import { Operation } from '../model/operation';

@Injectable()
export class APIManagerService {

    constructor(private apiGeneratorService:APIGeneratorService) {
    }

    private apiUrl:string;
    private jsonAPI:{};
    private api:API;

    private activeActionSource = new Subject<Action>();
    activeAction$ = this.activeActionSource.asObservable();

    private activeOperationSource = new Subject<Operation>();
    activeOperation$ = this.activeOperationSource.asObservable();

    private initialData: {} = {};

    setAPIUrl(url:string) {
        this.apiUrl = url;
    }

    getAPI():Observable<API> {
        if (!this.api) {
            return this.apiGeneratorService.getAPI(this.apiUrl)
                .map(jsonAPI => {
                        this.jsonAPI = jsonAPI;
                        this.api = this.apiGeneratorService.generateAPI(this.jsonAPI);
                        return this.api;
                    }
                );
        } else {
            return Observable.of(this.api);
        }
    }

    setActiveAction(action: Action) {
        this.activeActionSource.next(action);
        this.initialData = {};
        this.activeOperationSource.next(action.operations[0]);
    }

    setActiveOperation(operation: Operation, initialData: {}) {
        let action: Action = this.api.getActionByOperation(operation);
        this.activeActionSource.next(action);
        this.initialData = initialData;
        this.activeOperationSource.next(operation);
    }

    getInitialData(): {} {
        return this.initialData;
    }

}
