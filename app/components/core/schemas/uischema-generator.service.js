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
var UischemaGeneratorService = (function () {
    function UischemaGeneratorService() {
    }
    UischemaGeneratorService.prototype.generateUischema = function (dataschema) {
        var _this = this;
        var uischema = {
            'type': 'VerticalLayout',
            'elements': []
        };
        _.forEach(dataschema['properties'], function (property, name) {
            _this.addProperty(uischema['elements'], property, name, '#/properties/');
        });
        return uischema;
    };
    UischemaGeneratorService.prototype.addProperty = function (layoutElements, property, name, path) {
        var _this = this;
        if (property['type'] == 'object') {
            var sublayout_1 = {
                'type': 'Group',
                'label': name,
                'elements': []
            };
            _.forEach(property['properties'], function (subproperty, subname) {
                _this.addProperty(sublayout_1['elements'], subproperty, subname, path + name + '/properties/');
            });
            layoutElements.push(sublayout_1);
        }
        else {
            var control = {
                'type': 'Control',
                'label': name,
                'scope': {
                    '$ref': path + name
                }
            };
            layoutElements.push(control);
        }
    };
    UischemaGeneratorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], UischemaGeneratorService);
    return UischemaGeneratorService;
}());
exports.UischemaGeneratorService = UischemaGeneratorService;
//# sourceMappingURL=uischema-generator.service.js.map