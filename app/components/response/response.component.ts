import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { UischemaGeneratorService } from '../core/schemas/uischema-generator.service';
import { ResponseMessagesService } from './response-messages.service';
import { APIManagerService } from '../core/api-manager/api-manager.service';
import { OperationPerformerService } from '../core/operation-performer/operation-performer.service';

import { Operation } from '../core/model/operation';
import { APIResponse } from '../core/model/api-response';

import { JsonFormsAdapter } from '../../adapters/jsonforms.adapter';

@Component({
    selector: 'response-section',
    moduleId: module.id,
    templateUrl: 'response.component.html',
    styleUrls: ['../center-content.css'],
    providers: [UischemaGeneratorService, ResponseMessagesService],
    directives: [JsonFormsAdapter]
})
export class ResponseComponent {

    activeOperation: Operation;

    response: Response;
    isResponseReady: boolean = false;
    responseMessage: string;

    dataschema: {};
    uischema: {};
    data: {};

    constructor(private uischemaGeneratorService: UischemaGeneratorService,
                private responseMessagesService: ResponseMessagesService,
                private apiManagerService: APIManagerService,
                private operationPerformerService: OperationPerformerService) {
        apiManagerService.activeOperation$.subscribe((activeOperation: Operation) => {
            this.activeOperation = activeOperation;
            this.isResponseReady = false;
        });

        operationPerformerService.response$.subscribe(
            (response) => {
                this.response = response;

                let apiResponse: APIResponse = this.activeOperation.getResponseByCode(response.status);
                if (apiResponse) {
                    this.responseMessage = apiResponse.getDescription();
                } else {
                    this.responseMessage = this.responseMessagesService.getMessage(response.status);
                }

                if (apiResponse && apiResponse.hasSchema()) {
                    this.dataschema = apiResponse.getSchema();
                    this.uischema = this.uischemaGeneratorService.generateUischema(this.dataschema);
                    this.data = response.json();
                } else {
                    this.dataschema = null;
                    this.uischema = null;
                    this.data = null;
                }

                this.isResponseReady = true;
            },
            (error) => {
                this.responseMessage = error;
                this.dataschema = null;
                this.uischema = null;
                this.data = null;
                this.isResponseReady = true;
            }
        );
    }

    onClickRelatedOperation(relatedOperation: Operation) {
        let initialData: {} = { body: this.data };
        this.apiManagerService.setActiveOperation(relatedOperation, initialData);
    }

}
