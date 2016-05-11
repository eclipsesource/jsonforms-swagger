import { Component } from '@angular/core';

import { IObserver } from '../../helpers/observer/observer.interface';

import { ActiveOperationService } from '../core/active-operation/active-operation.service';
import { UischemaGeneratorService } from '../core/schemas/uischema-generator.service';

import { Operation } from '../core/model/operation';
import { APIResponse } from '../core/model/api-response';

import { JsonFormsAdapter } from '../../adapters/jsonforms.adapter';

@Component({
  selector: 'response-section',
  moduleId: module.id,
  templateUrl: 'response.html',
  directives: [JsonFormsAdapter],
  providers: [UischemaGeneratorService],
  styleUrls: ['./response.css']
})
export class ResponseComponent implements IObserver {

  activeOperation: Operation;

  responseMessage: string;

  dataschema: {};
  uischema: {};
  data: {};

  constructor(private activeOperationService: ActiveOperationService,
              private uischemaGeneratorService: UischemaGeneratorService) {
    activeOperationService.attach(this);
  }

  update(notification: string) {
    this.responseMessage = '';
    this.data = {};

    if (notification == 'new active operation') {
      this.updateActiveOperation();
    }

    if (notification == 'response ready') {
      this.responseReady();
    }
  }

  updateActiveOperation() {
    this.activeOperation = this.activeOperationService.getActiveOperation();
  }

  responseReady() {
    let response = this.activeOperationService.getResponse();

    let apiResponse: APIResponse = this.activeOperation.getResponseByCode(response.status);
    if (apiResponse) {
      this.responseMessage = apiResponse.getDescription();
    } else {
      this.responseMessage = response.statusText;
    }
    console.log(this.responseMessage);

    if (apiResponse && apiResponse.hasSchema()) {
      this.dataschema = apiResponse.getSchema();
      this.uischema = this.uischemaGeneratorService.generateUischema(this.dataschema);
      this.data = response.json();
    }
  }

}
