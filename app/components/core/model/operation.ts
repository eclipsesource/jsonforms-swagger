import {Parameter} from "./parameter";
export class Operation {

  properties: {};

  getType(): string {
    return this.properties['type'];
  }

  getPath(): string {
    return this.properties['path'];
  }

  getParameters(): Parameter[] {
    return this.properties['parameters'];
  }

  getOperationId(): string {
    return this.properties['operationId'];
  }

}
