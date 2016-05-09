import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { IOperationPerformer } from './operation-performer.interface';
import { PostPerformer } from './post-performer';

import { Operation } from '../model/operation';
import { Parameter } from '../model/parameter';

@Injectable()
export class OperationPerformerService {

  operationPerformer: IOperationPerformer;

  constructor(private http: Http) {}

  performOperation(operation: Operation, data: {}): Observable<Response> {
    this.selectOperationPerformerType(operation);

    let url: string = operation.getUrl();
    let body: string;
    let headers: Headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

    _.forEach(operation.getParameters(), (parameter: Parameter) => {
      switch (parameter.getIn()) {
        case 'body':
          body = this.addBodyParameter(parameter, data); // we assume that only one parameter of type body is allowed
          break;
        // TODO: rest of parameters types
      }
    });

    let options = new RequestOptions({ headers: headers });

    return this.operationPerformer.performOperation(this.http, url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  selectOperationPerformerType(operation: Operation) {
    switch  (operation.getType()) {
      case 'post':
        this.operationPerformer = new PostPerformer();
        break;
      // TODO: rest of operation types
    }
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

  private addBodyParameter(parameter: Parameter, data: {}): string {
    return JSON.stringify(data[parameter.getName()]);
  }

}
