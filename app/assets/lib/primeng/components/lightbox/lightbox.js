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
var Lightbox = (function () {
    function Lightbox(el) {
        this.el = el;
        this.initialized = false;
    }
    Lightbox.prototype.ngAfterViewInit = function () {
        jQuery(this.el.nativeElement.children[0]).puilightbox();
        this.initialized = true;
    };
    Lightbox.prototype.ngOnChanges = function (changes) {
        if (this.initialized) {
            for (var key in changes) {
                jQuery(this.el.nativeElement.children[0]).puilightbox('option', key, changes[key].currentValue);
            }
        }
    };
    Lightbox.prototype.ngOnDestroy = function () {
        jQuery(this.el.nativeElement.children[0]).puilightbox('destroy');
        this.initialized = false;
    };
    Lightbox = __decorate([
        core_1.Component({
            selector: 'p-lightbox',
            template: "\n        <div>\n            <ng-content></ng-content>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Lightbox);
    return Lightbox;
})();
exports.Lightbox = Lightbox;
//# sourceMappingURL=lightbox.js.map