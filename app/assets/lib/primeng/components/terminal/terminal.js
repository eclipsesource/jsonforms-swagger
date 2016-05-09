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
var Terminal = (function () {
    function Terminal(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.responseChange = new core_1.EventEmitter();
        this.handler = new core_1.EventEmitter();
        this.commands = [];
    }
    Terminal.prototype.ngAfterViewInit = function () {
        this.container = this.domHandler.find(this.el.nativeElement, '.ui-terminal')[0];
    };
    Terminal.prototype.ngAfterViewChecked = function () {
        if (this.commandProcessed) {
            this.container.scrollTop = this.container.scrollHeight;
            this.commandProcessed = false;
        }
    };
    Object.defineProperty(Terminal.prototype, "response", {
        set: function (value) {
            if (value) {
                this.commands.push({ text: this.command, response: value });
                this.command = null;
                this.commandProcessed = true;
                this.responseChange.next(null);
            }
        },
        enumerable: true,
        configurable: true
    });
    Terminal.prototype.handleCommand = function (event, container) {
        if (event.keyCode == 13) {
            this.handler.next({ originalEvent: event, command: this.command });
        }
    };
    Terminal.prototype.focus = function (element) {
        element.focus();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Terminal.prototype, "welcomeMessage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Terminal.prototype, "prompt", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Terminal.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Terminal.prototype, "styleClass", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Terminal.prototype, "responseChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Terminal.prototype, "handler", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], Terminal.prototype, "response", null);
    Terminal = __decorate([
        core_1.Component({
            selector: 'p-terminal',
            template: "\n        <div [ngClass]=\"'ui-terminal ui-widget ui-widget-content ui-corner-all'\" [attr.style]=\"style\" [attr.styleClass]=\"styleClass\" (click)=\"focus(in)\">\n            <div *ngIf=\"welcomeMessage\">{{welcomeMessage}}</div>\n            <div class=\"ui-terminal-content\">\n                <div *ngFor=\"#command of commands\">\n                    <span>{{prompt}}</span>\n                    <span class=\"ui-terminal-command\">{{command.text}}</span>\n                    <div>{{command.response}}</div>\n                </div>\n            </div>\n            <div>\n                <span class=\"ui-terminal-content-prompt\">{{prompt}}</span>\n                <input #in type=\"text\" [(ngModel)]=\"command\" class=\"ui-terminal-input\" autocomplete=\"off\" (keydown)=\"handleCommand($event,container)\" autofocus>\n            </div>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler])
    ], Terminal);
    return Terminal;
})();
exports.Terminal = Terminal;
//# sourceMappingURL=terminal.js.map