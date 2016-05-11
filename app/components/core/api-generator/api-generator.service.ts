declare var JsonRefs: any;

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { API } from '../model/api';
import { Tag } from '../model/tag';
import { Operation } from '../model/operation';
import { Parameter } from '../model/parameter';
import { APIResponse } from '../model/api-response';

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
    api.properties = _.pick(jsonAPI, ['info', 'host', 'basePath']);
    this.generateTags(api, jsonAPI);
    this.generateOperations(api, jsonAPI);
    return api;
  }

  private generateTags(api: API, jsonAPI: {}) {
    let tagsNames: string[] = [];

    _.forEach(jsonAPI['paths'], (jsonPath: {}) => {
      _.forEach(jsonPath, (jsonOperation: {}) => {
        _.forEach(jsonOperation['tags'], (tagName: string) => {
          if (tagsNames.indexOf(tagName) < 0) {
            tagsNames.push(tagName);
            let tag: Tag = new Tag();
            tag.properties['name'] = tagName;
            api.tags.push(tag);
          }
        });
      });
    });

    _.forEach(jsonAPI['tags'], (jsonTag: {}) => {
      let tag: Tag = api.getTagByName(jsonTag['name']);
      if (jsonTag['description']) {
        tag.properties['description'] = jsonTag['description'];
      }
    });
  }

  private generateOperations(api: API, jsonAPI: {}) {
    let baseUrl = api.getBaseUrl();
    _.forEach(jsonAPI['paths'], (jsonPath: {}, path: string) => {
      _.forEach(jsonPath, (jsonOperation: {}, operationType: string) => {
        let tagName: string = jsonOperation['tags'][0]; // we are assuming an operation corresponds to only one tag
        let tag: Tag = api.getTagByName(tagName);
        this.generateOperation(tag, baseUrl, path, operationType, jsonOperation);
      });
    });
  }

  private generateOperation(tag: Tag, baseUrl: string, path: string, type: string, jsonOperation: {}) {
    let operation: Operation = new Operation();
    operation.properties = _.pick(jsonOperation, ['summary', 'description', 'operationId']);
    operation.properties['baseUrl'] = baseUrl;
    operation.properties['path'] = path;
    operation.properties['type'] = type;

    this.generateParameters(operation, jsonOperation);
    this.generateResponses(operation, jsonOperation);

    tag.operations.push(operation);
  }

  private generateParameters(operation: Operation, jsonOperation: {}) {
    _.forEach(jsonOperation['parameters'], (jsonParameter: {}) => {
      let parameter: Parameter = new Parameter();
      parameter.properties = jsonParameter;

      operation.parameters.push(parameter);
    });
  }

  private generateResponses(operation: Operation, jsonOperation: {}) {
    _.forEach(jsonOperation['responses'], (jsonResponse, code) => {
      let response: APIResponse = new APIResponse();
      response.properties = jsonResponse;
      response.properties['code'] = code;

      operation.responses.push(response);
    });
  }

}
