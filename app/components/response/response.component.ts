import { Component } from '@angular/core';
import { Response, ResponseType } from '@angular/http';

import { ResponseDataschemaGeneratorService } from '../core/schemas/response-dataschema-generator.service';
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
  templateUrl: 'response.html',
  styleUrls: ['../center-content.css'],
  providers: [
    ResponseDataschemaGeneratorService,
    UischemaGeneratorService,
    ResponseMessagesService
  ],
  directives: [JsonFormsAdapter]
})
export class ResponseComponent {

  activeOperation:Operation;

  isResponseReady:boolean = false;
  responseMessage:string;

  dataschema:{};
  uischema:{};
  data:{};

  constructor(private responseDataschemaGeneratorService:ResponseDataschemaGeneratorService,
              private uischemaGeneratorService:UischemaGeneratorService,
              private responseMessagesService:ResponseMessagesService,
              private apiManagerService:APIManagerService,
              private operationPerformerService:OperationPerformerService) {
    apiManagerService.activeOperation.subscribe((activeOperation:Operation) => {
      this.activeOperation = activeOperation;
      this.isResponseReady = false;
    });

    operationPerformerService.response$.subscribe(
      (response) => {

        if (response.type == 3) { // value 3 of ResponseType enum is 'Error'
          this.responseMessage = 'Response error';
          this.resetSchemas();
          this.isResponseReady = true;
          return;
        }

        let apiResponse:APIResponse = this.activeOperation.getResponseByCode(response.status);
        if (!apiResponse) {
          this.responseMessage = this.responseMessagesService.getMessage(response.status);
          this.resetSchemas();
          this.isResponseReady = true;
          return;
        }

        this.responseMessage = apiResponse.getDescription();

        if (apiResponse.hasSchema()) {
          if (!response.json() || _.isEmpty(response.json())) {
            this.responseMessage = 'Empty response';
            this.resetSchemas();
            this.isResponseReady = true;
            return;
          }

          this.dataschema = this.responseDataschemaGeneratorService.generateDataschema(apiResponse.getSchema());
          this.uischema = this.uischemaGeneratorService.generateUischema(this.dataschema);

          if (apiResponse.isArray()) {
            this.data = response.json()[0]; // Only take first element until jsonforms array control implemented
          } else {
            this.data = response.json();
          }
        } else {
          this.resetSchemas();
        }

        this.isResponseReady = true;
      }
    );
  }

  private resetSchemas() {
    this.dataschema = null;
    this.uischema = null;
    this.data = null;
  }

  onClickRelatedOperation(relatedOperation:Operation) {
    let initialData:{} = {body: this.data};
    this.apiManagerService.setActiveOperation(relatedOperation, initialData);
  }

}
