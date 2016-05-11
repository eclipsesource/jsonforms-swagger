"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var get_performer_1 = require('./get-performer');
var post_performer_1 = require('./post-performer');
var put_performer_1 = require('./put-performer');
var delete_performer_1 = require('./delete-performer');
var OperationPerformerService = (function () {
    function OperationPerformerService(http) {
        this.http = http;
    }
    OperationPerformerService.prototype.performOperation = function (operation, data) {
        var _this = this;
        this.selectOperationPerformerType(operation);
        var url = operation.getUrl();
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        var body;
        _.forEach(operation.getParameters(), function (parameter) {
            switch (parameter.getIn()) {
                case 'path':
                    url = _this.addPathParameter(parameter, data, url);
                    break;
                case 'query':
                    url = _this.addQueryParameter(parameter, data, url);
                    break;
                case 'header':
                    _this.addHeaderParameter(parameter, data, headers);
                    break;
                case 'formData':
                    // TODO
                    break;
                case 'body':
                    body = _this.addBodyParameter(parameter, data); // we assume that only one parameter of type body is allowed
                    break;
            }
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.operationPerformer.performOperation(this.http, url, body, options); // Response and error management delegated to ResponseComponent
    };
    OperationPerformerService.prototype.selectOperationPerformerType = function (operation) {
        switch (operation.getType()) {
            case 'get':
                this.operationPerformer = new get_performer_1.GetPerformer();
                break;
            case 'post':
                this.operationPerformer = new post_performer_1.PostPerformer();
                break;
            case 'put':
                this.operationPerformer = new put_performer_1.PutPerformer();
                break;
            case 'delete':
                this.operationPerformer = new delete_performer_1.DeletePerformer();
                break;
        }
    };
    OperationPerformerService.prototype.addPathParameter = function (parameter, data, url) {
        var parameterName = parameter.getName();
        var parameterData = data[parameterName];
        return url.replace('{' + parameterName + '}', parameterData);
    };
    OperationPerformerService.prototype.addQueryParameter = function (parameter, data, url) {
        var parameterName = parameter.getName();
        var parameterData = data[parameterName];
        if (url.indexOf('?') >= 0) {
            url = url + '&';
        }
        else {
            url = url + '?';
        }
        return url + parameterName + '=' + parameterData;
    };
    OperationPerformerService.prototype.addHeaderParameter = function (parameter, data, headers) {
        var parameterName = parameter.getName();
        var parameterData = data[parameterName];
        headers.append(parameterName, parameterData);
    };
    OperationPerformerService.prototype.addBodyParameter = function (parameter, data) {
        return JSON.stringify(data[parameter.getName()]);
    };
    OperationPerformerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], OperationPerformerService);
    return OperationPerformerService;
}());
exports.OperationPerformerService = OperationPerformerService;
//# sourceMappingURL=operation-performer.service.js.map