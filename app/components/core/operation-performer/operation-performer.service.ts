import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

import { AuthService } from '../../auth/auth.service';
import { ErrorService } from '../../error/error.service';

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

    constructor(private http:Http, private authService: AuthService, private errorService: ErrorService) {
    }

    performOperation(operation:Operation, data:{}) {
        this.selectOperationPerformerType(operation);

        let url:string = operation.getUrl();
        let headers:Headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
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

        let auth = this.authService.applyStrategies(operation);
        if(!this.isAuthenticated(auth)){
            //TODO return error
			this.errorService.showErrorMessage('Not Authenticated!');
            console.log('Not Authenticated!');
            return;
        }
        this.addAuthParameters(auth, url, headers);

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
        if(this.queryIsAlreadyPresent(url, parameterName)){
            //TODO Error handling
            return url;
        }
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
            if(!headers.has(parameterName)) {
                headers.append(parameterName, parameterData);
            }
        }
    }

    private addBodyParameter(parameter:Parameter, data:{}):string {
        return JSON.stringify(data[parameter.getName()]);
    }

    private addAuthParameters(auth: any, url: string, oldHeaders: Headers){
        let parameters = auth['parameters'];
        let headers = auth['headers'];

        for(let parameterName in parameters){
            if(parameters.hasOwnProperty(parameterName)){
                if(this.queryIsAlreadyPresent(url, parameterName)){
                    //TODO error handling
                    continue;
                }

            }
            let parameterData = parameters[parameterName];
            if (!parameterData) {
                continue;
            }
            if (url.indexOf('?') >= 0) {
                url = url + '&';
            } else {
                url = url + '?';
            }
            url = url + parameterName + '=' + parameterData;
        }

        for(let headerName in headers){
            if(headers.hasOwnProperty(headerName)){
                let headerData = headers[headerName];
                if(!oldHeaders.has(headerName)){
                    oldHeaders.append(headerName, headerData);
                }
            }
        }
    }

    private isAuthenticated(auth: any):boolean {
        if(!auth){ //if this returns false, the operation cannot be done as it has not been authenticated
            return false;
        }
        return true;
    }


    private queryIsAlreadyPresent(url: string, queryName: string): boolean{
        var qp: any;
        if (url.indexOf('?') > 0) {
            qp = url.substring(url.indexOf('?') + 1);
            var parts = qp.split('&');
            if(parts && parts.length > 0) {
                for(var i = 0; i < parts.length; i++) {
                    var kv = parts[i].split('=');
                    if(kv && kv.length > 0) {
                        if (kv[0] === queryName) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
}
