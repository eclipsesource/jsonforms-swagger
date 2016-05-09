import { Component } from '@angular/core';

import { IObserver } from '../../helpers/observer/observer.interface';

import { ActiveOperationService } from '../core/active-operation/active-operation.service';
import {DataschemaGeneratorService} from "../core/schemas/dataschema-generator.service";
import {UischemaGeneratorService} from "../core/schemas/uischema-generator.service";
import {JsonFormsAdapter} from '../../adapters/jsonforms.adapter';

@Component({
  selector: 'query-section',
  templateUrl: 'app/components/query/query.html',
  directives: [JsonFormsAdapter],
  providers: [DataschemaGeneratorService, UischemaGeneratorService]
})
export class QueryComponent implements IObserver {

  dataschema: {};
  uischema: {};
  data: {};

  constructor(private activeOperationService: ActiveOperationService, private dataschemaGeneratorService: DataschemaGeneratorService,
              private uischemaGeneratorService: UischemaGeneratorService) {
    activeOperationService.attach(this);
  }

  update() {
    let op = this.activeOperationService.getActiveOperation();
    let parameters = op.getParameters();

    //TODO
    this.dataschema = this.dataschemaGeneratorService.generateDataschema(parameters);
    this.uischema = this.uischemaGeneratorService.generateUischema(this.dataschema);
    this.data = {};
    console.log(this.dataschema);
    console.log(this.uischema);

  }

}
