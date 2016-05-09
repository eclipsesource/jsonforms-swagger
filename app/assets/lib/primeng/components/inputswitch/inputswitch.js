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
var InputSwitch = (function () {
    function InputSwitch(el) {
        this.el = el;
        this.onLabel = 'On';
        this.offLabel = 'Off';
        this.onChange = new core_1.EventEmitter();
        this.checkedChange = new core_1.EventEmitter();
        this.initialized = false;
    }
    InputSwitch.prototype.ngAfterContentInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.inputSwitchElement = jQuery(_this.el.nativeElement.children[0]).find('> .ui-helper-hidden-accessible > input');
            _this.inputSwitchElement.puiswitch({
                checked: _this.checked,
                enhanced: true,
                change: function (event, ui) {
                    _this.stopNgOnChangesPropagation = true;
                    _this.checkedChange.next(ui.checked);
                    if (_this.onChange) {
                        _this.onChange.next({ originalEvent: event, checked: ui.checked });
                    }
                }
            });
            _this.initialized = true;
        }, 10);
    };
    InputSwitch.prototype.ngOnChanges = function (changes) {
        if (this.initialized) {
            for (var key in changes) {
                if (key == 'checked' && this.stopNgOnChangesPropagation) {
                    this.stopNgOnChangesPropagation = false;
                    continue;
                }
                this.inputSwitchElement.puiswitch('option', key, changes[key].currentValue);
            }
        }
    };
    InputSwitch.prototype.ngOnDestroy = function () {
        this.inputSwitchElement.puiswitch('destroy');
        this.initialized = false;
        this.inputSwitchElement = null;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InputSwitch.prototype, "onLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InputSwitch.prototype, "offLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], InputSwitch.prototype, "checked", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InputSwitch.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InputSwitch.prototype, "styleClass", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], InputSwitch.prototype, "onChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], InputSwitch.prototype, "checkedChange", void 0);
    InputSwitch = __decorate([
        core_1.Component({
            selector: 'p-inputSwitch',
            template: "\n        <div [ngClass]=\"'ui-inputswitch ui-widget ui-widget-content ui-corner-all'\" [attr.style]=\"style\" [attr.class]=\"styleClass\">\n            <div class=\"ui-inputswitch-off\">\n                <span>{{offLabel}}</span>\n            </div>\n            <div class=\"ui-inputswitch-on\">\n                <span>{{onLabel}}</span>\n            </div>\n            <div class=\"ui-inputswitch-handle ui-state-default\"></div>\n            <div class=\"ui-helper-hidden-accessible\">\n                <input type=\"checkbox\" />\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], InputSwitch);
    return InputSwitch;
})();
exports.InputSwitch = InputSwitch;
//# sourceMappingURL=inputswitch.js.map