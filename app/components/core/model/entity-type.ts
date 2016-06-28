import * as _ from 'lodash';

import { Action } from './action';
import { Operation } from './operation';

export class EntityType {

  name: string;
  actions: Action[] = [];

  getActionByOperation(operation: Operation): Action {
    return _.find(this.actions, (action: Action) => {
      return action.operations.indexOf(operation) >= 0;
    });
  }

}
