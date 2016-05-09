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
var Calendar = (function () {
    function Calendar(el) {
        this.el = el;
        this.valueChange = new core_1.EventEmitter();
        this.inline = false;
        this.onSelect = new core_1.EventEmitter();
        this.initialized = false;
    }
    Calendar.prototype.ngAfterContentInit = function () {
        var _this = this;
        setTimeout(function () {
            jQuery(_this.el.nativeElement.children[0]).datepicker({
                showAnim: _this.showAnim,
                dateFormat: _this.dateFormat,
                showButtonPanel: _this.showButtonPanel,
                changeMonth: _this.monthNavigator,
                changeYear: _this.yearNavigator,
                numberOfMonths: _this.numberOfMonths,
                showWeek: _this.showWeek,
                showOtherMonths: _this.showOtherMonths,
                selectOtherMonths: _this.selectOtherMonths,
                defaultDate: _this.defaultDate,
                minDate: _this.minDate,
                maxDate: _this.maxDate,
                onSelect: function (dateText) {
                    _this.stopNgOnChangesPropagation = true;
                    _this.onSelect.next(dateText);
                    _this.valueChange.next(dateText);
                }
            });
            _this.initialized = true;
        }, 10);
    };
    Calendar.prototype.ngOnChanges = function (changes) {
        if (this.initialized) {
            for (var key in changes) {
                if (key == 'value' && this.stopNgOnChangesPropagation) {
                    continue;
                }
                jQuery(this.el.nativeElement.children[0]).datepicker('option', key, changes[key].currentValue);
            }
        }
    };
    Calendar.prototype.ngOnDestroy = function () {
        jQuery(this.el.nativeElement.children[0]).datepicker('destroy');
        this.initialized = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "value", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Calendar.prototype, "valueChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "readonlyInput", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "inline", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "showAnim", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "dateFormat", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "showButtonPanel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "monthNavigator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "yearNavigator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "numberOfMonths", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "showWeek", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "showOtherMonths", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "selectOtherMonths", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Calendar.prototype, "defaultDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Calendar.prototype, "minDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Calendar.prototype, "maxDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Calendar.prototype, "disabled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Calendar.prototype, "onSelect", void 0);
    Calendar = __decorate([
        core_1.Component({
            selector: 'p-calendar',
            template: "\n        <input *ngIf=\"!inline\" type=\"text\" [attr.style]=\"style\" [attr.placeholder]=\"placeholder\"\n                [value]=\"value||''\" (input)=\"valueChange.next($event.target.value)\" [readonly]=\"readonlyInput\"\n                class=\"ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all\" [disabled]=\"disabled\"\n                (mouseenter)=\"hovered=true\" (mouseleave)=\"hovered=false\" (focus)=\"focused=true\" (blur)=\"focused=false\"\n                [ngClass]=\"{'ui-state-hover':hovered,'ui-state-focus':focused,'ui-state-disabled':disabled}\"/>\n\n        <div *ngIf=\"inline\"></div>\n    "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Calendar);
    return Calendar;
})();
exports.Calendar = Calendar;
//# sourceMappingURL=calendar.js.map