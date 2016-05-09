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
var domhandler_1 = require('../dom/domhandler');
var Button = (function () {
    function Button(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.iconPos = 'left';
    }
    Button.prototype.ngAfterViewInit = function () {
        this.domHandler.addMultipleClasses(this.el.nativeElement, this.getStyleClass());
        if (this.icon) {
            var iconElement = document.createElement("span");
            var iconPosClass = (this.iconPos == 'right') ? 'ui-button-icon-right' : 'ui-button-icon-left';
            iconElement.className = iconPosClass + ' ui-c fa fa-fw ' + this.icon;
            this.el.nativeElement.appendChild(iconElement);
        }
        var labelElement = document.createElement("span");
        labelElement.className = 'ui-button-text ui-c';
        labelElement.appendChild(document.createTextNode(this.label || 'ui-button'));
        this.el.nativeElement.appendChild(labelElement);
    };
    Button.prototype.onMouseover = function (e) {
        this.hover = true;
    };
    Button.prototype.onMouseout = function (e) {
        this.hover = false;
        this.active = false;
    };
    Button.prototype.onMouseDown = function (e) {
        this.active = true;
    };
    Button.prototype.onMouseUp = function (e) {
        this.active = false;
    };
    Button.prototype.onFocus = function (e) {
        this.focus = true;
    };
    Button.prototype.onBlur = function (e) {
        this.focus = false;
    };
    Button.prototype.isDisabled = function () {
        return this.el.nativeElement.disabled;
    };
    Button.prototype.getStyleClass = function () {
        var styleClass = 'ui-button ui-widget ui-state-default ui-corner-all';
        if (this.icon) {
            if (this.label) {
                if (this.iconPos == 'left')
                    styleClass = styleClass + ' ui-button-text-icon-left';
                else
                    styleClass = styleClass + ' ui-button-text-icon-right';
            }
            else {
                styleClass = styleClass + ' ui-button-icon-only';
            }
        }
        else {
            styleClass = styleClass + ' ui-button-text-only';
        }
        return styleClass;
    };
    Button.prototype.ngOnDestroy = function () {
        while (this.el.nativeElement.hasChildNodes()) {
            this.el.nativeElement.removeChild(this.el.nativeElement.lastChild);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Button.prototype, "icon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Button.prototype, "iconPos", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Button.prototype, "label", void 0);
    __decorate([
        core_1.HostListener('mouseover', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Button.prototype, "onMouseover", null);
    __decorate([
        core_1.HostListener('mouseout', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Button.prototype, "onMouseout", null);
    __decorate([
        core_1.HostListener('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Button.prototype, "onMouseDown", null);
    __decorate([
        core_1.HostListener('mouseup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Button.prototype, "onMouseUp", null);
    __decorate([
        core_1.HostListener('focus', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Button.prototype, "onFocus", null);
    __decorate([
        core_1.HostListener('blur', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Button.prototype, "onBlur", null);
    Button = __decorate([
        core_1.Directive({
            selector: '[pButton]',
            host: {
                '[class.ui-state-hover]': 'hover',
                '[class.ui-state-focus]': 'focus',
                '[class.ui-state-active]': 'active',
                '[class.ui-state-disabled]': 'isDisabled()'
            },
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler])
    ], Button);
    return Button;
})();
exports.Button = Button;
//# sourceMappingURL=button.js.map