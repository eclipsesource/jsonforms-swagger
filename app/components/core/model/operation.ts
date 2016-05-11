import { Parameter } from './parameter';
import { APIResponse } from './api-response';

export class Operation {

  properties: {};
  parameters: Parameter[] = [];
  responses: APIResponse[] = [];

  getType(): string {
    return this.properties['type'];
  }

  getPath(): string {
    return this.properties['path'];
  }

  getSummary(): string {
    return this.properties['summary'];
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
    return _.find(this.parameters, (parameter: Parameter) => {
      return parameter.getName() == name;
    });
  }

  getResponses(): APIResponse[] {
    return this.responses;
  }

  getResponseByCode(code: number): APIResponse {
    return _.find(this.responses, (response: APIResponse) => {
      return response.getCode() == code;
    })
  }

}
