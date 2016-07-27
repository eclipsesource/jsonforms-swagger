import { Operation } from './operation';

export class Action {

	name: string;
	operations: Operation[] = [];

	getOperationByPathAndType(path: string, type: string): Operation {
		return _.find(this.operations, (operation: Operation) => {
			return operation.getPath() == path && operation.getType() == type;
		});
	}

	addOperation(newOperation: Operation): boolean {
		let alreadyPresent: boolean = false;
		_.forEach(this.operations, (operation: Operation) => {
			if (newOperation.getTypeAndPath() == operation.getTypeAndPath()) {
				alreadyPresent = true;
				return false;
			}
		});

		if (alreadyPresent) {
			return false;
		}

		this.operations.push(newOperation);
		return true;
	}

	removeOperation(operation: Operation): boolean {
		let index = this.operations.indexOf(operation);
		if (index < 0) {
			return false;
		}
		this.operations.splice(index, 1);
		return true;
	}

}
