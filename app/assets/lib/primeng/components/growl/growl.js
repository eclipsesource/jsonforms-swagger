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
var Growl = (function () {
    function Growl(el) {
        this.el = el;
        this.initialized = false;
    }
    Growl.prototype.ngOnInit = function () {
        jQuery(this.el.nativeElement.children[0]).puigrowl({
            sticky: this.sticky,
            life: this.life,
            appendTo: null,
            messages: this.value
        });
        this.initialized = true;
    };
    Growl.prototype.ngOnChanges = function (changes) {
        if (this.initialized) {
            for (var key in changes) {
                jQuery(this.el.nativeElement.children[0]).puigrowl('option', key, changes[key].currentValue);
            }
        }
    };
    Growl.prototype.ngOnDestroy = function () {
        jQuery(this.el.nativeElement.children[0]).puigrowl('destroy');
        this.initialized = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Growl.prototype, "sticky", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Growl.prototype, "life", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Growl.prototype, "value", void 0);
    Growl = __decorate([
        core_1.Component({
            selector: 'p-growl',
            template: "<div></div>"
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Growl);
    return Growl;
})();
exports.Growl = Growl;
//# sourceMappingURL=growl.js.map