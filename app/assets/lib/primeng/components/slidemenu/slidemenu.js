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
var SlideMenu = (function () {
    function SlideMenu(el) {
        this.el = el;
        this.backLabel = 'Back';
        this.initialized = false;
    }
    SlideMenu.prototype.ngAfterViewInit = function () {
        this.menuElement = jQuery(this.el.nativeElement).find('> div > div > div > ul');
        this.menuElement.puislidemenu({
            enhanced: true,
            popup: this.popup,
            trigger: this.trigger ? jQuery(this.trigger) : null,
            my: this.my,
            at: this.at,
            triggerEvent: this.triggerEvent
        });
        this.initialized = true;
    };
    SlideMenu.prototype.ngOnChanges = function (changes) {
        if (this.initialized) {
            for (var key in changes) {
                this.menuElement.puislidemenu('option', key, changes[key].currentValue);
            }
        }
    };
    SlideMenu.prototype.ngOnDestroy = function () {
        this.menuElement.puislidemenu('destroy');
        this.initialized = false;
        this.menuElement = null;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SlideMenu.prototype, "popup", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SlideMenu.prototype, "trigger", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SlideMenu.prototype, "my", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SlideMenu.prototype, "at", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SlideMenu.prototype, "triggerEvent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SlideMenu.prototype, "backLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SlideMenu.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SlideMenu.prototype, "styleClass", void 0);
    SlideMenu = __decorate([
        core_1.Component({
            selector: 'p-slideMenu',
            template: "\n        <div [attr.class]=\"styleClass\" [attr.style]=\"style\" [ngClass]=\"{'ui-menu ui-slidemenu ui-widget ui-widget-content ui-corner-all':true}\">\n            <div class=\"ui-slidemenu-wrapper\">\n                <div class=\"ui-slidemenu-content\">\n                    <ng-content></ng-content>\n                </div>\n                <div class=\"ui-slidemenu-backward ui-widget-header ui-corner-all\">\n                    <span class=\"fa fa-fw fa-caret-left\"></span>{{backLabel}}\n                </div>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], SlideMenu);
    return SlideMenu;
})();
exports.SlideMenu = SlideMenu;
//# sourceMappingURL=slidemenu.js.map