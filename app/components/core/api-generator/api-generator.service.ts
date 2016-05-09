declare var JsonRefs: any;

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { API } from '../model/api';
import { Tag } from '../model/tag';
import { Operation } from '../model/operation';
import { Parameter } from '../model/parameter';

@Injectable()
export class APIGeneratorService {

  constructor(private http: Http) {}

  getAPI(url: string): Observable<{}> {
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let jsonApi: {} = res.json();
    let resolvedJsonApi: {};
    JsonRefs.resolveRefs(jsonApi, {}, function(err: any, res: any) {
      resolvedJsonApi = res;
    });
    return resolvedJsonApi;
  }

  private handleError (error: any) {
    let errMsg = error.message || 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  generateAPI(jsonAPI: {}): API {
    let api = new API();
    api.properties = _.pick(jsonAPI, ['info']);
    this.generateTags(api, jsonAPI);
    this.generateOperations(api, jsonAPI);
    return api;
  }

  private generateTags(api: API, jsonAPI: {}) {
    _.forEach(jsonAPI['tags'], (jsonTag:any) => {
      let tag = new Tag();
      tag.properties = _.pick(jsonTag, ['name', 'description']);
      api.tags.push(tag);
    });
  }

  private generateOperations(api: API, jsonAPI: {}) {
    _.forEach(jsonAPI['paths'], (jsonPath:any, path:any) => {
      _.forEach(jsonPath, (jsonOperation:any, operationType:any) => {
        let tagName: string = jsonOperation['tags'][0]; // we are assuming an operation corresponds to only one tag
        let tag: Tag = api.getTagByName(tagName);
        this.generateOperation(tag, path, operationType, jsonOperation);
      });
    });
  }

  private generateOperation(tag: Tag, path: string, type: string, jsonOperation: {}) {
    let operation: Operation = new Operation();
    operation.properties = _.pick(jsonOperation, ['summary', 'description', 'operationId']);
    operation.properties['path'] = path;
    operation.properties['type'] = type;

    this.generateParameters(operation, jsonOperation);

    // TODO: generate operation responses

    tag.operations.push(operation);
  }

  private generateParameters(operation: Operation, jsonOperation: {}) {
    _.forEach(jsonOperation['parameters'], (jsonParameter) => {
      let parameter: Parameter = new Parameter();
      parameter.properties = jsonParameter;

      operation.parameters.push(parameter);
    });
  }

}
