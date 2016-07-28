import { Component, OnDestroy } from '@angular/core';

import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';

import { APIManagerService } from '../core/api-manager/api-manager.service';
import { QueryDataschemaGeneratorService } from '../core/schemas/query-dataschema-generator.service';
import { UischemaGeneratorService } from '../core/schemas/uischema-generator.service';
import { DataGeneratorService } from '../core/schemas/data-generator.service';
import { OperationPerformerService } from '../core/operation-performer/operation-performer.service';
import { AuthService } from "../auth/auth.service";

import { Action } from '../core/model/action';
import { Operation } from '../core/model/operation';

import { JsonFormsAdapter } from '../../adapters/jsonforms.adapter';

@Component({
    selector: 'query-section',
    moduleId: module.id,
    templateUrl: 'query.html',
    styleUrls: ['../center-content.css'],
    providers: [
		QueryDataschemaGeneratorService,
		UischemaGeneratorService,
		DataGeneratorService
	],
    directives: [JsonFormsAdapter]
})
export class QueryComponent implements OnDestroy {

    activeAction: Action;
    activeActionSubscription: Subscription;

    activeOperation: Operation;
    activeOperationSubscription: Subscription;

    dataschema: {};
    uischema: {};
    data: {};

    constructor(private dataschemaGeneratorService: QueryDataschemaGeneratorService,
                private uischemaGeneratorService: UischemaGeneratorService,
				private dataGeneratorService: DataGeneratorService,
                private apiManagerService: APIManagerService,
                private operationPerformerService: OperationPerformerService,
                private authService: AuthService) {
        this. activeActionSubscription = apiManagerService.activeAction.subscribe((activeAction: Action) => this.activeAction = activeAction);

        this.activeOperationSubscription = apiManagerService.activeOperation.subscribe((activeOperation: Operation) => {
            this.activeOperation = activeOperation;

			if (this.activeOperation) {
				this.dataschema = this.dataschemaGeneratorService.generateDataschema(this.activeOperation.getParameters());
				this.uischema = this.uischemaGeneratorService.generateUischema(this.dataschema);
				this.data = this.dataGeneratorService.generateData(this.activeOperation.getParameters(), this.apiManagerService.getInitialData());
			}
        });
    }

    getOperationsList() {
        return (this.activeAction && this.activeAction.operations) || [this.activeOperation];
    }

    selectOperation(operation: Operation) {
        this.apiManagerService.setActiveOperation(operation, {});
    }

	removeOperation(operation) {
		if (this.activeAction.removeOperation(operation)) {
			if (this.activeOperation == operation) {
				let newActiveOperation: Operation = null;
				if (this.activeAction.operations.length > 0) {
					newActiveOperation = this.activeAction.operations[0];
				}
				this.apiManagerService.setActiveOperation(newActiveOperation, {});
			}
		}
	}

    performOperation() {
        this.operationPerformerService.performOperation(this.activeOperation, this.data);
    }

    ngOnDestroy() {
        this.activeActionSubscription.unsubscribe();
        this.activeOperationSubscription.unsubscribe();
    }

}
