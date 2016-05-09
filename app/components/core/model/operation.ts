import { Parameter } from './parameter';

export class Operation {

  properties: {};
  parameters: Parameter[] = [];

  getType(): string {
    return this.properties['type'];
  }

  getPath(): string {
    return this.properties['path'];
  }

  getParameters(): Parameter[] {
    return this.parameters;
  }

  getOperationId(): string {
    return this.properties['operationId'];
  }

}
