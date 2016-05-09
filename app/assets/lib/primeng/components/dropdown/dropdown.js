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
var Dropdown = (function () {
    function Dropdown(el) {
        this.el = el;
        this.valueChange = new core_1.EventEmitter();
        this.onChange = new core_1.EventEmitter();
        this.initialized = false;
    }
    Dropdown.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.selectElement = jQuery(this.el.nativeElement).find(' > .ui-dropdown > div > select');
        this.selectElement.puidropdown({
            enhanced: true,
            value: this.value,
            filter: this.filter,
            filterMatchMode: this.filterMatchMode,
            style: this.style,
            styleClass: this.styleClass,
            change: function (event, ui) {
                var selectedValue = _this.options[ui.index].value;
                _this.onChange.emit({ originalEvent: event, value: selectedValue });
                _this.valueChange.emit(selectedValue);
            }
        });
        this.initialized = true;
    };
    Dropdown.prototype.ngOnChanges = function (changes) {
        if (this.initialized) {
            for (var key in changes) {
                this.selectElement.puidropdown('option', key, changes[key].currentValue);
            }
        }
    };
    Dropdown.prototype.ngOnDestroy = function () {
        this.selectElement.puidropdown('destroy');
        this.initialized = false;
        this.selectElement = null;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Dropdown.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Dropdown.prototype, "value", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Dropdown.prototype, "valueChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Dropdown.prototype, "onChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Dropdown.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Dropdown.prototype, "filter", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Dropdown.prototype, "filterMatchMode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Dropdown.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Dropdown.prototype, "styleClass", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], Dropdown.prototype, "itemTemplate", void 0);
    Dropdown = __decorate([
        core_1.Component({
            selector: 'p-dropdown',
            template: "\n        <div class=\"ui-dropdown ui-widget ui-state-default ui-corner-all ui-helper-clearfix\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <select>\n                    <option *ngFor=\"#option of options\" [value]=\"option.value\">{{option.label}}</option>\n                </select>\n            </div>\n            <div class=\"ui-helper-hidden-accessible\">\n                <input type=\"text\">\n            </div>\n            <label class=\"ui-dropdown-label ui-inputtext ui-corner-all\"></label>\n            <div class=\"ui-dropdown-trigger ui-state-default ui-corner-right\">\n                <span class=\"fa fa-fw fa-caret-down\"></span>\n            </div>\n            <div class=\"ui-dropdown-panel ui-widget-content ui-corner-all ui-helper-hidden ui-shadow\">\n                <div *ngIf=\"filter\" class=\"ui-dropdown-filter-container\">\n                    <input type=\"text\" autocomplete=\"off\" class=\"ui-dropdown-filter ui-inputtext ui-widget ui-state-default ui-corner-all\">\n                    <span class=\"fa fa-search\"></span>\n                </div>\n                <div class=\"ui-dropdown-items-wrapper\">\n                    <ul *ngIf=\"!itemTemplate\" class=\"ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\">\n                        <li *ngFor=\"#option of options\" [attr.data-label]=\"option.label\" class=\"ui-dropdown-item ui-dropdown-list-item ui-corner-all\">{{option.label}}</li>\n                    </ul>\n                    <ul *ngIf=\"itemTemplate\" class=\"ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\">\n                        <template ngFor [ngForOf]=\"options\" [ngForTemplate]=\"itemTemplate\"></template>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Dropdown);
    return Dropdown;
})();
exports.Dropdown = Dropdown;
//# sourceMappingURL=dropdown.js.map