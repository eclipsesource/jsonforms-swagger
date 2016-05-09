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
var Slider = (function () {
    function Slider(el) {
        this.el = el;
        this.onChange = new core_1.EventEmitter();
        this.valueChange = new core_1.EventEmitter();
        this.valuesChange = new core_1.EventEmitter();
        this.initialized = false;
    }
    Slider.prototype.ngAfterViewInit = function () {
        var _this = this;
        jQuery(this.el.nativeElement.children[0]).slider({
            animate: this.animate,
            disabled: this.disabled,
            max: this.max,
            min: this.min,
            orientation: this.orientation,
            range: this.range,
            step: this.step,
            value: this.value,
            values: this.values,
            slide: function (event, ui) {
                _this.stopNgOnChangesPropagation = true;
                if (_this.range) {
                    _this.onChange.emit({ originalEvent: event, values: ui.values });
                    _this.valuesChange.emit(ui.values);
                }
                else {
                    _this.onChange.emit({ originalEvent: event, value: ui.value });
                    _this.valueChange.emit(ui.value);
                }
            }
        });
        this.initialized = true;
    };
    Slider.prototype.ngOnChanges = function (changes) {
        if (this.initialized) {
            for (var key in changes) {
                if ((key === 'value' || key === 'values') && this.stopNgOnChangesPropagation) {
                    this.stopNgOnChangesPropagation = false;
                    continue;
                }
                jQuery(this.el.nativeElement.children[0]).slider('option', key, changes[key].currentValue);
            }
        }
    };
    Slider.prototype.ngOnDestroy = function () {
        jQuery(this.el.nativeElement.children[0]).slider('destroy');
        this.initialized = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Slider.prototype, "animate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Slider.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Slider.prototype, "min", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Slider.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Slider.prototype, "orientation", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Slider.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Slider.prototype, "values", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Slider.prototype, "step", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Slider.prototype, "range", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Slider.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Slider.prototype, "styleClass", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Slider.prototype, "onChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Slider.prototype, "valueChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Slider.prototype, "valuesChange", void 0);
    Slider = __decorate([
        core_1.Component({
            selector: 'p-slider',
            template: "\n        <div [attr.style]=\"style\" [attr.class]=\"styleClass\"></div>\n    "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Slider);
    return Slider;
})();
exports.Slider = Slider;
//# sourceMappingURL=slider.js.map