import { Component } from '@angular/core';

import { IObserver } from '../../helpers/observer/observer.interface';

import { ActiveOperationService } from '../core/active-operation/active-operation.service';

@Component({
  selector: 'my-query-section',
  templateUrl: 'app/components/query/query.component.html'
})
export class QueryComponent implements IObserver {

  // TODO: the real attributes should be the schema, uischema and data to generate the query form with jsonforms
  activeOperationType: string;
  activeOperationPath: string;

  constructor(private activeOperationService: ActiveOperationService) {
    activeOperationService.attach(this);
  }

  update() {
    let op = this.activeOperationService.getActiveOperation();
    this.activeOperationType = op.getType();
    this.activeOperationPath = op.getPath();
  }

}
