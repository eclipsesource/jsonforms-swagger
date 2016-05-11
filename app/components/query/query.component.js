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
var operation_performer_service_1 = require('../core/operation-performer/operation-performer.service');
var dataschema_generator_service_1 = require('./dataschema-generator.service');
var uischema_generator_service_1 = require('./uischema-generator.service');
var jsonforms_adapter_1 = require('../../adapters/jsonforms.adapter');
var QueryComponent = (function () {
    function QueryComponent(activeOperationService, dataschemaGeneratorService, uischemaGeneratorService, operationPerformerService) {
        this.activeOperationService = activeOperationService;
        this.dataschemaGeneratorService = dataschemaGeneratorService;
        this.uischemaGeneratorService = uischemaGeneratorService;
        this.operationPerformerService = operationPerformerService;
        activeOperationService.attach(this);
    }
    QueryComponent.prototype.update = function () {
        this.activeOperation = this.activeOperationService.getActiveOperation();
        this.dataschema = this.dataschemaGeneratorService.generateDataschema(this.activeOperation.getParameters());
        this.uischema = this.uischemaGeneratorService.generateUischema(this.dataschema);
        this.data = {};
    };
    QueryComponent.prototype.performOperation = function () {
        this.operationPerformerService.performOperation(this.activeOperation, this.data)
            .subscribe(function (response) {
            console.log(response);
            // TODO
        }, function (error) {
            console.log(error);
            // TODO
        });
    };
    QueryComponent = __decorate([
        core_1.Component({
            selector: 'query-section',
            templateUrl: './query.html',
            moduleId: module.id,
            directives: [jsonforms_adapter_1.JsonFormsAdapter],
            providers: [dataschema_generator_service_1.DataschemaGeneratorService, uischema_generator_service_1.UischemaGeneratorService],
            styleUrls: ['./query.css']
        }), 
        __metadata('design:paramtypes', [active_operation_service_1.ActiveOperationService, dataschema_generator_service_1.DataschemaGeneratorService, uischema_generator_service_1.UischemaGeneratorService, operation_performer_service_1.OperationPerformerService])
    ], QueryComponent);
    return QueryComponent;
}());
exports.QueryComponent = QueryComponent;
//# sourceMappingURL=query.component.js.map