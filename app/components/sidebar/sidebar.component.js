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
var jsonforms_adapter_1 = require('../../adapters/jsonforms.adapter');
var primeng_1 = require('primeng/primeng');
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
        this.uischema = {
            "type": "HorizontalLayout",
            "elements": [
                {
                    "label": "Name",
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
            template: '<button pButton type="button" label="click"></button><jsonforms class="jsf" [schema]="schema" [uischema]="uischema" [data]="data"></jsonforms>',
            directives: [jsonforms_adapter_1.JsonFormsAdapter, primeng_1.Button]
        }), 
        __metadata('design:paramtypes', [])
    ], SidebarComponent);
    return SidebarComponent;
})();
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map