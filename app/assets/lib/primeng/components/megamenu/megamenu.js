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
var MegaMenu = (function () {
    function MegaMenu(el) {
        this.el = el;
        this.initialized = false;
    }
    MegaMenu.prototype.ngAfterViewInit = function () {
        this.menuElement = jQuery(this.el.nativeElement).children('div');
        this.menuElement.puimegamenu({
            enhanced: true,
            autoDisplay: this.autoDisplay,
            orientation: this.orientation
        });
        this.initialized = true;
    };
    MegaMenu.prototype.ngOnChanges = function (changes) {
        if (this.initialized) {
            for (var key in changes) {
                this.menuElement.puimegamenu('option', key, changes[key].currentValue);
            }
        }
    };
    MegaMenu.prototype.ngOnDestroy = function () {
        this.menuElement.puimegamenu('destroy');
        this.initialized = false;
        this.menuElement = null;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MegaMenu.prototype, "autoDisplay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MegaMenu.prototype, "orientation", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MegaMenu.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MegaMenu.prototype, "styleClass", void 0);
    MegaMenu = __decorate([
        core_1.Component({
            selector: 'p-megaMenu',
            template: "\n        <div [attr.class]=\"styleClass\" [attr.style]=\"style\"\n            [ngClass]=\"{'ui-menu ui-menubar ui-megamenu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true,'ui-megamenu-vertical': orientation == 'vertical'}\">\n            <div tabindex=\"0\" class=\"ui-helper-hidden-accessible\"></div>\n            <ng-content></ng-content>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], MegaMenu);
    return MegaMenu;
})();
exports.MegaMenu = MegaMenu;
//# sourceMappingURL=megamenu.js.map