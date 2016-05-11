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
var sidebar_component_1 = require('./components/sidebar/sidebar.component');
var header_component_1 = require('./components/header/header.component');
var query_component_1 = require('./components/query/query.component');
var response_component_1 = require('./components/response/response.component');
var api_generator_service_1 = require('./components/core/api-generator/api-generator.service');
var active_operation_service_1 = require('./components/core/active-operation/active-operation.service');
var operation_performer_service_1 = require('./components/core/operation-performer/operation-performer.service');
require('lodash');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            moduleId: module.id,
            templateUrl: 'app.html',
            styleUrls: ['app.css'],
            directives: [sidebar_component_1.SidebarComponent, header_component_1.HeaderComponent, query_component_1.QueryComponent, response_component_1.ResponseComponent],
            providers: [
                http_1.HTTP_PROVIDERS,
                api_generator_service_1.APIGeneratorService,
                active_operation_service_1.ActiveOperationService,
                operation_performer_service_1.OperationPerformerService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map