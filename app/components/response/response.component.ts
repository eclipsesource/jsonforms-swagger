import { Component } from '@angular/core';

import { IObserver } from '../../helpers/observer/observer.interface';

import { ActiveOperationService } from '../core/active-operation/active-operation.service';
import { ResponseDataschemaGeneratorService } from '../core/schemas/response-dataschema-generator.service';
import { UischemaGeneratorService } from '../core/schemas/uischema-generator.service';

import { Operation } from '../core/model/operation';
import { APIResponse } from '../core/model/api-response';

import { JsonFormsAdapter } from '../../adapters/jsonforms.adapter';

@Component({
  selector: 'response-section',
  moduleId: module.id,
  templateUrl: 'response.html',
  directives: [JsonFormsAdapter],
  providers: [ResponseDataschemaGeneratorService, UischemaGeneratorService]
})
export class ResponseComponent implements IObserver {

  activeOperation: Operation;

  dataschema: {};
  uischema: {};
  data: {};

  constructor(private activeOperationService: ActiveOperationService) {
    activeOperationService.attach(this);
  }

  update(notification: string) {
    if (notification == 'new active operation') {
      this.updateActiveOperation();
    }

    if (notification == 'response ready') {
      this.responseReady();
    }
  }

  updateActiveOperation() {
    this.activeOperation = this.activeOperationService.getActiveOperation();

    this.data = {};
  }

  responseReady() {
    let response = this.activeOperationService.getResponse();

    let apiResponse: APIResponse = this.activeOperation.getResponseByCode(response.status);
    let message: string;
    if (apiResponse) {
      message = apiResponse.getDescription();
    } else {
      message = response.statusText;
    }
    console.log(message);

    if (apiResponse && apiResponse.hasSchema()) {
      this.data = response.json();
      console.log(this.data);
    }
  }

}
