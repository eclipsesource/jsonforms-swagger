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
var active_operation_service_1 = require('../core/active-operation/active-operation.service');
var response_dataschema_generator_service_1 = require('../core/schemas/response-dataschema-generator.service');
var uischema_generator_service_1 = require('../core/schemas/uischema-generator.service');
var jsonforms_adapter_1 = require('../../adapters/jsonforms.adapter');
var ResponseComponent = (function () {
    function ResponseComponent(activeOperationService) {
        this.activeOperationService = activeOperationService;
        activeOperationService.attach(this);
    }
    ResponseComponent.prototype.update = function (notification) {
        if (notification == 'new active operation') {
            this.updateActiveOperation();
        }
        if (notification == 'response ready') {
            this.responseReady();
        }
    };
    ResponseComponent.prototype.updateActiveOperation = function () {
        this.activeOperation = this.activeOperationService.getActiveOperation();
        this.data = {};
    };
    ResponseComponent.prototype.responseReady = function () {
        var response = this.activeOperationService.getResponse();
        var apiResponse = this.activeOperation.getResponseByCode(response.status);
        var message;
        if (apiResponse) {
            message = apiResponse.getDescription();
        }
        else {
            message = response.statusText;
        }
        console.log(message);
        if (apiResponse && apiResponse.hasSchema()) {
            this.data = response.json();
            console.log(this.data);
        }
    };
    ResponseComponent = __decorate([
        core_1.Component({
            selector: 'response-section',
            moduleId: module.id,
            templateUrl: 'response.html',
            directives: [jsonforms_adapter_1.JsonFormsAdapter],
            providers: [response_dataschema_generator_service_1.ResponseDataschemaGeneratorService, uischema_generator_service_1.UischemaGeneratorService],
            styleUrls: ['./response.css']
        }), 
        __metadata('design:paramtypes', [active_operation_service_1.ActiveOperationService])
    ], ResponseComponent);
    return ResponseComponent;
}());
exports.ResponseComponent = ResponseComponent;
//# sourceMappingURL=response.component.js.map