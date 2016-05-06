export class Operation {

  properties: {};

  getType(): string {
    return this.properties['type'];
  }

  getPath(): string {
    return this.properties['path'];
  }

  getOperationId(): string {
    return this.properties['operationId'];
  }

}
