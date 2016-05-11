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
var core_1 = require("@angular/core");
var Checkbox = (function () {
    function Checkbox() {
        this.backColor = 'red';
        this.frontColor = 'blue';
        this.initial = false;
        this.changed = new core_1.EventEmitter();
    }
    Checkbox.prototype.ngOnInit = function () {
        this.state = this.initial;
        this.changed.emit(this.state);
    };
    Checkbox.prototype.onclick = function () {
        this.state = !this.state;
        this.changed.emit(this.state);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Checkbox.prototype, "backColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Checkbox.prototype, "frontColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Checkbox.prototype, "initial", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Checkbox.prototype, "changed", void 0);
    Checkbox = __decorate([
        core_1.Component({
            selector: 'uik-checkbox',
            template: '<div class="container" (click)="onclick()"></div>',
            styles: ["\n    .container{\n        background-color: red;\n        color: blue;\n        width: 50px;\n        height: 50px;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], Checkbox);
    return Checkbox;
}());
exports.Checkbox = Checkbox;
//# sourceMappingURL=Checkbox.js.map