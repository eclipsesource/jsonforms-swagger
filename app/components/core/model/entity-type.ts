import * as _ from 'lodash';

import { Action } from './action';
import { Operation } from './operation';

export class EntityType {

	name:string;
	actions:Action[] = [];

	getActionByName(name:string): Action {
		return _.find(this.actions, (action: Action) => {
			return action.name == name;
		});
	}

	getActionByOperation(operation:Operation):Action {
		return _.find(this.actions, (action:Action) => {
			return action.operations.indexOf(operation) >= 0;
		});
	}

	addAction(name: string): boolean {
		if (this.getActionByName(name)) {
			return false;
		}
		let action: Action = new Action;
		action.name = name;
		this.actions.push(action);
		return true;
	}

}
