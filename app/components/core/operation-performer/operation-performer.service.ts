import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

import { IOperationPerformer } from './operation-performer.interface';
import { GetPerformer } from './get-performer';
import { PostPerformer } from './post-performer';
import { PutPerformer } from './put-performer';
import { DeletePerformer } from './delete-performer';


import { Operation } from '../model/operation';
import { Parameter } from '../model/parameter';

@Injectable()
export class OperationPerformerService {

    operationPerformer:IOperationPerformer;

    private responseSource = new Subject<Response>();
    response$ = this.responseSource.asObservable();

    constructor(private http:Http) {
    }

    performOperation(operation:Operation, data:{}) {
        this.selectOperationPerformerType(operation);

        let url:string = operation.getUrl();
        let headers:Headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
        let body:string;

        _.forEach(operation.getParameters(), (parameter:Parameter) => {
            switch (parameter.getIn()) {
                case 'path':
                    url = this.addPathParameter(parameter, data, url);
                    break;
                case 'query':
                    url = this.addQueryParameter(parameter, data, url);
                    break;
                case 'header':
                    this.addHeaderParameter(parameter, data, headers);
                    break;
                case 'formData':
                    // TODO
                    break;
                case 'body':
                    body = this.addBodyParameter(parameter, data); // we assume that only one parameter of type body is allowed
                    break;
            }
        });

        let options = new RequestOptions({headers: headers});

        this.operationPerformer.performOperation(this.http, url, body, options).subscribe(
            (res) => this.responseSource.next(res),
            (error) => this.responseSource.next(error)
        );
    }

    selectOperationPerformerType(operation:Operation) {
        switch (operation.getType()) {
            case 'get':
                this.operationPerformer = new GetPerformer();
                break;
            case 'post':
                this.operationPerformer = new PostPerformer();
                break;
            case 'put':
                this.operationPerformer = new PutPerformer();
                break;
            case 'delete':
                this.operationPerformer = new DeletePerformer();
                break;
        }
    }

    private addPathParameter(parameter:Parameter, data:{}, url:string):string {
        let parameterName:string = parameter.getName();
        let parameterData = data[parameterName];
        return url.replace('{' + parameterName + '}', parameterData);
    }

    private addQueryParameter(parameter:Parameter, data:{}, url:string):string {
        let parameterName:string = parameter.getName();
        let parameterData = data[parameterName];
        if (!parameterData) {
            return url;
        }
        if (url.indexOf('?') >= 0) {
            url = url + '&';
        } else {
            url = url + '?';
        }
        return url + parameterName + '=' + parameterData;
    }

    private addHeaderParameter(parameter:Parameter, data:{}, headers:Headers) {
        let parameterName:string = parameter.getName();
        let parameterData = data[parameterName];
        if (parameterData) {
            headers.append(parameterName, parameterData);
        }
    }

    private addBodyParameter(parameter:Parameter, data:{}):string {
        return JSON.stringify(data[parameter.getName()]);
    }

}
