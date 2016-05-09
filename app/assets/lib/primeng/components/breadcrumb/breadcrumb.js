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
var Breadcrumb = (function () {
    function Breadcrumb(el) {
        this.el = el;
        this.initialized = false;
    }
    Breadcrumb.prototype.ngAfterViewInit = function () {
        this.menuElement = jQuery(this.el.nativeElement).find('> div > ul');
        this.menuElement.puibreadcrumb({
            enhanced: true
        });
        this.initialized = true;
    };
    Breadcrumb.prototype.ngOnChanges = function (changes) {
        if (this.initialized) {
            for (var key in changes) {
                this.menuElement.puibreadcrumb('option', key, changes[key].currentValue);
            }
        }
    };
    Breadcrumb.prototype.ngOnDestroy = function () {
        this.menuElement.puibreadcrumb('destroy');
        this.initialized = false;
        this.menuElement = null;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Breadcrumb.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Breadcrumb.prototype, "styleClass", void 0);
    Breadcrumb = __decorate([
        core_1.Component({
            selector: 'p-breadcrumb',
            template: "\n        <div [attr.class]=\"styleClass\" [attr.style]=\"style\" [ngClass]=\"{'ui-breadcrumb ui-widget ui-widget-header ui-helper-clearfix ui-corner-all':true}\">\n            <ng-content></ng-content>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Breadcrumb);
    return Breadcrumb;
})();
exports.Breadcrumb = Breadcrumb;
//# sourceMappingURL=breadcrumb.js.map