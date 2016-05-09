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
var Carousel = (function () {
    function Carousel(el) {
        this.el = el;
        this.initialized = false;
    }
    Carousel.prototype.ngAfterViewInit = function () {
        this.carouselElement = jQuery(this.el.nativeElement).find('> .ui-carousel > .ui-carousel-viewport > ul');
        this.carouselElement.puicarousel({
            numVisible: this.numVisible,
            firstVisible: this.firstVisible,
            headerText: this.headerText,
            effectDuration: this.effectDuration,
            circular: this.circular,
            breakpoint: this.breakpoint,
            responsive: this.responsive,
            autoplayInterval: this.autoplayInterval,
            easing: this.easing,
            pageLinks: this.pageLinks,
            style: this.style,
            styleClass: this.styleClass,
            enhanced: true
        });
        this.initialized = true;
    };
    Carousel.prototype.ngOnChanges = function (changes) {
        if (this.initialized) {
            for (var key in changes) {
                this.carouselElement.puicarousel('option', key, changes[key].currentValue);
            }
        }
    };
    Carousel.prototype.ngOnDestroy = function () {
        this.carouselElement.puicarousel('destroy');
        this.initialized = false;
        this.carouselElement = null;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Carousel.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Carousel.prototype, "numVisible", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Carousel.prototype, "firstVisible", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Carousel.prototype, "headerText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Carousel.prototype, "effectDuration", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Carousel.prototype, "circular", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Carousel.prototype, "breakpoint", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Carousel.prototype, "responsive", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Carousel.prototype, "autoplayInterval", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Carousel.prototype, "easing", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Carousel.prototype, "pageLinks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Carousel.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Carousel.prototype, "styleClass", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], Carousel.prototype, "itemTemplate", void 0);
    Carousel = __decorate([
        core_1.Component({
            selector: 'p-carousel',
            template: "\n        <div class=\"ui-carousel ui-widget-content ui-corner-all\">\n            <div class=\"ui-carousel-viewport\">\n                <ul>\n                    <template ngFor [ngForOf]=\"value\" [ngForTemplate]=\"itemTemplate\"></template>\n                </ul>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Carousel);
    return Carousel;
})();
exports.Carousel = Carousel;
//# sourceMappingURL=carousel.js.map