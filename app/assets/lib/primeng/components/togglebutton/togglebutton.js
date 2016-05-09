var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var ToggleButton = (function () {
    function ToggleButton() {
        this.onLabel = 'Yes';
        this.offLabel = 'No';
        this.onChange = new core_1.EventEmitter();
        this.checkedChange = new core_1.EventEmitter();
    }
    ToggleButton.prototype.getIconClass = function () {
        var baseClass = 'ui-button-icon-left fa fa-fw';
        return baseClass + ' ' + (this.checked ? this.onIcon : this.offIcon);
    };
    ToggleButton.prototype.toggle = function (event) {
        if (!this.disabled) {
            this.checkedChange.next(!this.checked);
            this.onChange.next({
                originalEvent: event,
                checked: !this.checked
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ToggleButton.prototype, "onLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ToggleButton.prototype, "offLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ToggleButton.prototype, "onIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ToggleButton.prototype, "offIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ToggleButton.prototype, "checked", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ToggleButton.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ToggleButton.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ToggleButton.prototype, "styleClass", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ToggleButton.prototype, "onChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ToggleButton.prototype, "checkedChange", void 0);
    ToggleButton = __decorate([
        core_1.Component({
            selector: 'p-toggleButton',
            template: "\n        <div [ngClass]=\"{'ui-button ui-togglebutton ui-widget ui-state-default ui-corner-all': true, 'ui-button-text-only': (!onIcon&&!offIcon), 'ui-button-text-icon-left': (onIcon&&offIcon),\n                'ui-state-active': checked, 'ui-state-hover': hover&&!disabled, 'ui-state-disabled': disabled}\" [attr.style]=\"style\" [attr.class]=\"styleClass\" \n                (click)=\"toggle($event)\" (mouseenter)=\"hover=true\" (mouseleave)=\"hover=false\">\n            <span *ngIf=\"onIcon||offIcon\" [attr.class]=\"getIconClass()\"></span>\n            <span class=\"ui-button-text ui-unselectable-text\">{{checked ? onLabel : offLabel}}</span>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], ToggleButton);
    return ToggleButton;
})();
exports.ToggleButton = ToggleButton;
//# sourceMappingURL=togglebutton.js.map