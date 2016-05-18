import { Component, Output } from '@angular/core';

import { ActiveOperationService } from '../core/active-operation/active-operation.service';
import { QueryDataschemaGeneratorService } from '../core/schemas/query-dataschema-generator.service';
import { UischemaGeneratorService } from '../core/schemas/uischema-generator.service';
import { OperationPerformerService } from '../core/operation-performer/operation-performer.service';

import { Operation } from '../core/model/operation';

import { JsonFormsAdapter } from '../../adapters/jsonforms.adapter';

@Component({
  selector: 'query-section',
  styleUrls: ['../center-content.css'],
  moduleId: module.id,
  templateUrl: 'query.html',
  directives: [JsonFormsAdapter],
  providers: [QueryDataschemaGeneratorService, UischemaGeneratorService]
})
export class QueryComponent {
  activeOperation: Operation;

  dataschema: {};
  uischema: {};
  data: {};


  constructor(private activeOperationService: ActiveOperationService,
              private dataschemaGeneratorService: QueryDataschemaGeneratorService,
              private uischemaGeneratorService: UischemaGeneratorService,
              private operationPerformerService: OperationPerformerService) {
    this.activeOperationService.activeOperation.subscribe((op: Operation)=>{

      this.activeOperation = op;
      if(!op){
        return;
      }
      this.dataschema = this.dataschemaGeneratorService.generateDataschema(this.activeOperation.getParameters());
      this.uischema = this.uischemaGeneratorService.generateUischema(this.dataschema);
      this.data = this.activeOperationService.getInitialData();

      if (!_.isEmpty(this.data)) {
        this.performOperation();
      }
    })

  }

  update(notification: string) {
    if (notification == 'new active operation') {

    }
  }

  performOperation() {
    this.operationPerformerService.performOperation(this.activeOperation, this.data)
      .subscribe(
        (response) => {
          this.activeOperationService.setResponse(response);
        },
        (error) => {
          this.activeOperationService.setResponse(error);
        }
      );
  }

}
