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
var api_generator_service_1 = require('../core/api-generator/api-generator.service');
var active_operation_service_1 = require('../core/active-operation/active-operation.service');
var jsonforms_adapter_1 = require('../../adapters/jsonforms.adapter');
var primeng_1 = require('../../assets/lib/primeng/primeng');
var SidebarComponent = (function () {
    function SidebarComponent(apiGeneratorService, activeOperationService) {
        this.apiGeneratorService = apiGeneratorService;
        this.activeOperationService = activeOperationService;
        activeOperationService.attach(this);
    }
    SidebarComponent.prototype.generateAPI = function (url) {
        var _this = this;
        this.apiGeneratorService.getAPI(url)
            .subscribe(function (jsonAPI) {
            _this.api = _this.apiGeneratorService.generateAPI(jsonAPI);
            _this.errorMessage = null;
        }, function (error) {
            _this.errorMessage = error;
            _this.api = null;
        });
    };
    SidebarComponent.prototype.update = function () {
        this.activeOperationId = this.activeOperationService.getActiveOperation().getOperationId();
    };
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'sidebar',
            moduleId: module.id,
            templateUrl: 'sidebar.html',
            directives: [jsonforms_adapter_1.JsonFormsAdapter, primeng_1.PanelMenu],
            styleUrls: ['sidebar.css']
        }), 
        __metadata('design:paramtypes', [api_generator_service_1.APIGeneratorService, active_operation_service_1.ActiveOperationService])
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map