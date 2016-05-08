var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var sidebar_component_1 = require('./components/sidebar/sidebar.component');
var header_component_1 = require('./components/header/header.component');
var query_component_1 = require('./components/query/query.component');
var api_generator_service_1 = require('./components/core/api-generator/api-generator.service');
var active_operation_service_1 = require('./components/core/active-operation/active-operation.service');
require('/node_modules/lodash/lodash.js');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            moduleId: module.id,
            templateUrl: 'app.html',
            styleUrls: ['app.css'],
            directives: [sidebar_component_1.SidebarComponent, header_component_1.HeaderComponent, query_component_1.QueryComponent],
            providers: [
                http_1.HTTP_PROVIDERS,
                api_generator_service_1.APIGeneratorService,
                active_operation_service_1.ActiveOperationService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map