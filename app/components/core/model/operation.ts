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

  getUrl(): string {
    return this.properties['baseUrl'] + this.properties['path'];
  }

  getOperationId(): string {
    return this.properties['operationId'];
  }

  getParameters(): Parameter[] {
    return this.parameters;
  }

  getParameterByName(name: string): Parameter {
    return _.find(this.parameters, function(parameter) {
      return parameter.properties['name'] == name;
    });
  }

}
