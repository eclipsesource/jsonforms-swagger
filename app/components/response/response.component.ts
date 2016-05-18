import { Component } from '@angular/core';
import { ActiveOperationService } from '../core/active-operation/active-operation.service';
import { UischemaGeneratorService } from '../core/schemas/uischema-generator.service';
import { ResponseMessagesService } from './response-messages.service';

import { Operation } from '../core/model/operation';
import { APIResponse } from '../core/model/api-response';

import { JsonFormsAdapter } from '../../adapters/jsonforms.adapter';
import { Response } from '@angular/http';

@Component({
  selector: 'response-section',
  moduleId: module.id,
  templateUrl: 'response.html',
  directives: [JsonFormsAdapter],
  providers: [UischemaGeneratorService, ResponseMessagesService],
  styleUrls: ['../center-content.css']
})
export class ResponseComponent {

  activeOperation: Operation;

  isResponseReady: boolean = false;

  responseMessage: string;

  dataschema: {};
  uischema: {};
  data: {};

  constructor(private activeOperationService: ActiveOperationService,
              private uischemaGeneratorService: UischemaGeneratorService,
              private responseMessagesService: ResponseMessagesService) {

    activeOperationService.activeOperation.subscribe((op)=>{
      if(!op){
        return;
      }
      this.isResponseReady = false;
      this.responseMessage = '';
      this.data = null;
      this.updateActiveOperation(op);
    });
    activeOperationService.response.subscribe((res)=>{
      if(!res){
        return;
      }
      this.responseReady(res);
    })
  }

  updateActiveOperation(op: Operation) {
    this.activeOperation = op;
  }

  responseReady(response: Response) {

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
    }

    this.isResponseReady = true;
  }

  onClickRelatedOperation(relatedOperation: Operation) {
    let initialData: {} = { body: this.data };
    this.activeOperationService.setActiveOperation(relatedOperation, initialData);
  }

}
