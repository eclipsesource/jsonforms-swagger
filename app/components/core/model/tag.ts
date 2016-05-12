import { Operation } from './operation';

export class Tag {

  properties: {} = {};
  operations: Operation[] = [];

  getName(): string {
    return this.properties['name'];
  }

  getOperationById(id: string): Operation {
    return _.find(this.operations, (operation: Operation) => {
      return operation.getOperationId() == id;
    });
  }

}
