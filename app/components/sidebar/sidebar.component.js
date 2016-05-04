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
var jsonforms_adapter_1 = require('../../adapters/jsonforms.adapter');
console.log(jsonforms_adapter_1.JsonFormsAdapter);
var SidebarComponent = (function () {
    function SidebarComponent() {
        this.schema = {
            "type": "object",
            "properties": {
                "firstName": {
                    "type": "string"
                },
                "lastName": {
                    "type": "string"
                }
            }
        };
        this.uiSchema = {
            "type": "HorizontalLayout",
            "elements": [
                {
                    "type": "Control",
                    "scope": {
                        "$ref": "#/properties/firstName"
                    }
                },
                {
                    "type": "Control",
                    "scope": {
                        "$ref": "#/properties/lastName"
                    }
                }
            ]
        };
        this.data = {
            "firstName": "Johny"
        };
    }
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'sidebar',
            template: '<div><ul><li>Hi</li><li>Ho</li></ul><jsonforms [schema]="schema" [ui-schema]="uiSchema" [data]="data"></jsonforms></div>',
            directives: [jsonforms_adapter_1.JsonFormsAdapter]
        }), 
        __metadata('design:paramtypes', [])
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map