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
var Menubar = (function () {
    function Menubar(el) {
        this.el = el;
        this.initialized = false;
    }
    Menubar.prototype.ngAfterViewInit = function () {
        this.menuElement = jQuery(this.el.nativeElement).find('> div > ul');
        this.menuElement.puimenubar({
            enhanced: true,
            autoDisplay: this.autoDisplay
        });
        this.initialized = true;
    };
    Menubar.prototype.ngOnChanges = function (changes) {
        if (this.initialized) {
            for (var key in changes) {
                this.menuElement.puimenubar('option', key, changes[key].currentValue);
            }
        }
    };
    Menubar.prototype.ngOnDestroy = function () {
        this.menuElement.puimenubar('destroy');
        this.initialized = false;
        this.menuElement = null;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Menubar.prototype, "autoDisplay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Menubar.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Menubar.prototype, "styleClass", void 0);
    Menubar = __decorate([
        core_1.Component({
            selector: 'p-menubar',
            template: "\n        <div [attr.class]=\"styleClass\" [attr.style]=\"style\" [ngClass]=\"{'ui-menubar ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true}\">\n            <ng-content></ng-content>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Menubar);
    return Menubar;
})();
exports.Menubar = Menubar;
//# sourceMappingURL=menubar.js.map