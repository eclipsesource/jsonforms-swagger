import { Component } from '@angular/core';

import * as _ from 'lodash';

import { APIManagerService } from '../core/api-manager/api-manager.service';
import { QueryDataschemaGeneratorService } from '../core/schemas/query-dataschema-generator.service';
import { UischemaGeneratorService } from '../core/schemas/uischema-generator.service';
import { OperationPerformerService } from '../core/operation-performer/operation-performer.service';

import { Action } from '../core/model/action';
import { Operation } from '../core/model/operation';

import { JsonFormsAdapter } from '../../adapters/jsonforms.adapter';

@Component({
    selector: 'query-section',
    moduleId: module.id,
    templateUrl: 'query.component.html',
    styleUrls: ['../center-content.css'],
    providers: [QueryDataschemaGeneratorService, UischemaGeneratorService],
    directives: [JsonFormsAdapter]
})
export class QueryComponent {

    activeAction: Action;
    activeOperation: Operation;

    dataschema: {};
    uischema: {};
    data: {};

    constructor(private dataschemaGeneratorService: QueryDataschemaGeneratorService,
                private uischemaGeneratorService: UischemaGeneratorService,
                private apiManagerService: APIManagerService,
                private operationPerformerService: OperationPerformerService) {
        apiManagerService.activeAction$.subscribe((activeAction: Action) => this.activeAction = activeAction);

        apiManagerService.activeOperation$.subscribe((activeOperation: Operation) => {
            this.activeOperation = activeOperation;

            this.dataschema = this.dataschemaGeneratorService.generateDataschema(this.activeOperation.getParameters());
            this.uischema = this.uischemaGeneratorService.generateUischema(this.dataschema);
            this.data = this.apiManagerService.getInitialData();
        });
    }

    selectOperation(operation: Operation) {
        this.apiManagerService.setActiveOperation(operation, {});
    }

    performOperation() {
        this.operationPerformerService.performOperation(this.activeOperation, this.data);
    }

}
