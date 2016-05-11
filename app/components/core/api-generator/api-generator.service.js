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
var Observable_1 = require('rxjs/Observable');
var api_1 = require('../model/api');
var tag_1 = require('../model/tag');
var operation_1 = require('../model/operation');
var parameter_1 = require('../model/parameter');
var APIGeneratorService = (function () {
    function APIGeneratorService(http) {
        this.http = http;
    }
    APIGeneratorService.prototype.getAPI = function (url) {
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    APIGeneratorService.prototype.extractData = function (res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        var jsonApi = res.json();
        var resolvedJsonApi;
        JsonRefs.resolveRefs(jsonApi, {}, function (err, res) {
            resolvedJsonApi = res;
        });
        return resolvedJsonApi;
    };
    APIGeneratorService.prototype.handleError = function (error) {
        var errMsg = error.message || 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    APIGeneratorService.prototype.generateAPI = function (jsonAPI) {
        var api = new api_1.API();
        api.properties = _.pick(jsonAPI, ['info', 'host', 'basePath']);
        this.generateTags(api, jsonAPI);
        this.generateOperations(api, jsonAPI);
        return api;
    };
    APIGeneratorService.prototype.generateTags = function (api, jsonAPI) {
        _.forEach(jsonAPI['tags'], function (jsonTag) {
            var tag = new tag_1.Tag();
            tag.properties = _.pick(jsonTag, ['name', 'description']);
            api.tags.push(tag);
        });
    };
    APIGeneratorService.prototype.generateOperations = function (api, jsonAPI) {
        var _this = this;
        var baseUrl = api.getBaseUrl();
        _.forEach(jsonAPI['paths'], function (jsonPath, path) {
            _.forEach(jsonPath, function (jsonOperation, operationType) {
                var tagName = jsonOperation['tags'][0]; // we are assuming an operation corresponds to only one tag
                var tag = api.getTagByName(tagName);
                _this.generateOperation(tag, baseUrl, path, operationType, jsonOperation);
            });
        });
    };
    APIGeneratorService.prototype.generateOperation = function (tag, baseUrl, path, type, jsonOperation) {
        var operation = new operation_1.Operation();
        operation.properties = _.pick(jsonOperation, ['summary', 'description', 'operationId']);
        operation.properties['baseUrl'] = baseUrl;
        operation.properties['path'] = path;
        operation.properties['type'] = type;
        this.generateParameters(operation, jsonOperation);
        // TODO: generate operation responses
        tag.operations.push(operation);
    };
    APIGeneratorService.prototype.generateParameters = function (operation, jsonOperation) {
        _.forEach(jsonOperation['parameters'], function (jsonParameter) {
            var parameter = new parameter_1.Parameter();
            parameter.properties = jsonParameter;
            operation.parameters.push(parameter);
        });
    };
    APIGeneratorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], APIGeneratorService);
    return APIGeneratorService;
}());
exports.APIGeneratorService = APIGeneratorService;
//# sourceMappingURL=api-generator.service.js.map