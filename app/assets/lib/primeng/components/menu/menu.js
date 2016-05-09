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
var Menu = (function () {
    function Menu(el) {
        this.el = el;
        this.initialized = false;
    }
    Menu.prototype.ngAfterViewInit = function () {
        this.menuElement = jQuery(this.el.nativeElement).find('> div > ul');
        this.menuElement.puimenu({
            enhanced: true,
            popup: this.popup,
            trigger: this.trigger ? jQuery(this.trigger) : null,
            my: this.my,
            at: this.at,
            triggerEvent: this.triggerEvent
        });
        this.initialized = true;
    };
    Menu.prototype.ngOnChanges = function (changes) {
        if (this.initialized) {
            for (var key in changes) {
                this.menuElement.puimenu('option', key, changes[key].currentValue);
            }
        }
    };
    Menu.prototype.ngOnDestroy = function () {
        this.menuElement.puimenu('destroy');
        this.initialized = false;
        this.menuElement = null;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Menu.prototype, "popup", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Menu.prototype, "trigger", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Menu.prototype, "my", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Menu.prototype, "at", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Menu.prototype, "triggerEvent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Menu.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Menu.prototype, "styleClass", void 0);
    Menu = __decorate([
        core_1.Component({
            selector: 'p-menu',
            template: "\n        <div [attr.class]=\"styleClass\" [attr.style]=\"style\" [ngClass]=\"{'ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true}\">\n            <ng-content></ng-content>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Menu);
    return Menu;
})();
exports.Menu = Menu;
//# sourceMappingURL=menu.js.map