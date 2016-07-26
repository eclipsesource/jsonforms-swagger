import * as _ from 'lodash';

import { Parameter } from './parameter';
import { APIResponse } from './api-response';

export class Operation {

  properties: {} = {};
  parameters: Parameter[] = [];
  responses: APIResponse[] = [];
  relatedOperations: Operation[] = [];

  getType(): string {
    return this.properties['type'];
  }

  getPath(): string {
    return this.properties['path'];
  }

  getTypeAndPath(): string {
    return this.getType() + ' - ' + this.getPath();
  }

  getTags(): string[] {
    return this.properties['tags'] || [];
  }

  getSummary(): string {
    return this.properties['summary'] || this.getTypeAndPath();
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
    });
  }
  getLocks(): any{
    var sec = this.properties['security'];
    if(!sec){
      return null;
    }
    return this.properties['security'][0];
  }
}
