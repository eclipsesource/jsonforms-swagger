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
    return res.json();
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
    this.generateRelatedOperations(api, jsonAPI);
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
    let resolvedJsonAPI: {};
    JsonRefs.resolveRefs(jsonAPI, {}, function(err: any, res: any) {
      resolvedJsonAPI = res;
    });

    let baseUrl = api.getBaseUrl();
    _.forEach(resolvedJsonAPI['paths'], (jsonPath: {}, path: string) => {
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

  private generateRelatedOperations(api: API, jsonAPI: {}) {
    let relatedOperations:{} = {};

    _.forEach(jsonAPI['paths'], (jsonPath: {}) => {
      _.forEach(jsonPath, (jsonOperation: {}) => {
        _.forEach(jsonOperation['parameters'], (jsonParameter: {}) => {
          var flattenedParam = this.flattenObjectRefs(jsonParameter);
          _.forEach(flattenedParam, (definitionRef)=>{
            if (relatedOperations[definitionRef]) {
              relatedOperations[definitionRef]['consumes'] = relatedOperations[definitionRef]['consumes'].concat([jsonOperation['operationId']]);
            } else {
              relatedOperations[definitionRef] = { consumes: [jsonOperation['operationId']], produces: [] };
            }
          });
        });

        _.forEach(jsonOperation['responses'], (jsonResponse: {}) => {
          var flattenedResponse = this.flattenObjectRefs(jsonResponse);
          _.forEach(flattenedResponse, (definitionRef)=>{
            if (relatedOperations[definitionRef]) {
              relatedOperations[definitionRef]['produces'] = relatedOperations[definitionRef]['produces'].concat([jsonOperation['operationId']]);
            } else {
              relatedOperations[definitionRef] = { consumes: [], produces: [jsonOperation['operationId']] };
            }
          });
        });
      });
    });

    _.forEach(relatedOperations, (relatedOperation: {}) => {
      _.forEach(relatedOperation['produces'], (producesId: string) => {
        let producesOperation: Operation = api.getOperationById(producesId);
        _.forEach(relatedOperation['consumes'], (consumesId: string) => {
          let consumesOperation: Operation = api.getOperationById(consumesId);
          producesOperation.relatedOperations.push(consumesOperation);
        });
      });
    });

    console.log(relatedOperations);
  }

  private flattenObjectRefs(ob: any):any {
    var toReturn = [];

    for (var i:any in ob) {
      if (!ob.hasOwnProperty(i)) continue;
      if ((typeof ob[i]) == 'object') {
        var flatObject:any = this.flattenObjectRefs(ob[i]);
        toReturn = toReturn.concat(flatObject);
      } else if(i === '$ref') {
        toReturn.push(ob[i]);
      }
    }
    return toReturn;
};

}
