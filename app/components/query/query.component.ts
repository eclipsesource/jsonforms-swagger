import { Component } from '@angular/core';

import { IObserver } from '../../helpers/observer/observer.interface';

import { ActiveOperationService } from '../core/active-operation/active-operation.service';
import { OperationPerformerService } from '../core/operation-performer/operation-performer.service';
import { DataschemaGeneratorService } from './dataschema-generator.service';
import { UischemaGeneratorService } from './uischema-generator.service';

import { Operation } from '../core/model/operation';

import { JsonFormsAdapter } from '../../adapters/jsonforms.adapter';

@Component({
  selector: 'query-section',
  templateUrl: 'app/components/query/query.html',
  directives: [JsonFormsAdapter],
  providers: [DataschemaGeneratorService, UischemaGeneratorService]
})
export class QueryComponent implements IObserver {

  activeOperation: Operation;

  dataschema: {};
  uischema: {};
  data: {};

  constructor(private activeOperationService: ActiveOperationService,
              private dataschemaGeneratorService: DataschemaGeneratorService,
              private uischemaGeneratorService: UischemaGeneratorService,
              private operationPerformerService: OperationPerformerService) {
    activeOperationService.attach(this);
  }

  update() {
    this.activeOperation = this.activeOperationService.getActiveOperation();

    this.dataschema = this.dataschemaGeneratorService.generateDataschema(this.activeOperation.getParameters());
    this.uischema = this.uischemaGeneratorService.generateUischema(this.dataschema);
    this.data = {};
  }

  performOperation() {
    this.operationPerformerService.performOperation(this.activeOperation, this.data)
      .subscribe(
        (response) => {
          console.log(response);
          // TODO
        },
        (error) => {
          console.log(error);
          // TODO
        }
      );
  }

}
