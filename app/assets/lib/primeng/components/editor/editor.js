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
var header_1 = require('../common/header');
var domhandler_1 = require('../dom/domhandler');
var Editor = (function () {
    function Editor(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.valueChange = new core_1.EventEmitter();
        this.onTextChange = new core_1.EventEmitter();
    }
    Editor.prototype.ngAfterViewInit = function () {
        var _this = this;
        var editorElement = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-editor-content');
        var toolbarElement = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-editor-toolbar');
        this.quill = new Quill(editorElement, {
            modules: { toolbar: toolbarElement },
            theme: 'snow'
        });
        this.quill.on('text-change', function (delta, source) {
            _this.selfChange = true;
            var htmlValue = _this.quill.getHTML();
            if (htmlValue == '<div><br></div>') {
                htmlValue = null;
            }
            _this.onTextChange.next({
                htmlValue: htmlValue,
                textValue: _this.quill.getText(),
                delta: delta,
                source: source
            });
            _this.valueChange.next(htmlValue);
        });
        if (this.value) {
            this.quill.setHTML(this.value);
        }
    };
    Editor.prototype.ngOnChanges = function (changes) {
        if (this.quill) {
            for (var key in changes) {
                if (key == 'value') {
                    if (this.selfChange) {
                        this.selfChange = false;
                        continue;
                    }
                    else {
                        var val = changes[key].currentValue;
                        if (val)
                            this.quill.setHTML(val);
                        else
                            this.quill.setText('');
                    }
                }
            }
        }
    };
    Editor.prototype.ngOnDestroy = function () {
        if (this.quill) {
            this.quill.destroy();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Editor.prototype, "value", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Editor.prototype, "valueChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Editor.prototype, "onTextChange", void 0);
    __decorate([
        core_1.ContentChild(header_1.Header), 
        __metadata('design:type', Object)
    ], Editor.prototype, "toolbar", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Editor.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Editor.prototype, "styleClass", void 0);
    Editor = __decorate([
        core_1.Component({
            selector: 'p-editor',
            template: "\n        <div [ngClass]=\"'ui-widget ui-editor-container ui-widget-content ui-corner-all'\" [attr.style]=\"style\" [attr.class]=\"styleClass\">\n            <div class=\"ui-editor-toolbar ui-widget-header ui-corner-top\" *ngIf=\"toolbar\">\n                <ng-content select=\"header\"></ng-content>\n            </div>\n            <div class=\"ui-editor-toolbar ui-widget-header ui-corner-top\" *ngIf=\"!toolbar\">\n            <span class=\"ql-format-group\">\n                <select title=\"Font\" class=\"ql-font\">\n                    <option value=\"sans-serif\" selected=\"\">Sans Serif</option>\n                    <option value=\"serif\">Serif</option>\n                    <option value=\"monospace\">Monospace</option>\n                </select>\n                <select title=\"Size\" class=\"ql-size\">\n                    <option value=\"10px\">Small</option>\n                    <option value=\"13px\" selected=\"\">Normal</option>\n                    <option value=\"18px\">Large</option>\n                    <option value=\"32px\">Huge</option>\n                </select>\n                </span>\n                <span class=\"ql-format-group\">\n                    <span title=\"Bold\" class=\"ql-format-button ql-bold\"></span>\n                    <span class=\"ql-format-separator\"></span>\n                    <span title=\"Italic\" class=\"ql-format-button ql-italic\"></span>\n                    <span class=\"ql-format-separator\"></span>\n                    <span title=\"Underline\" class=\"ql-format-button ql-underline\"></span>\n                    <span class=\"ql-format-separator\"></span>\n                    <span title=\"Strikethrough\" class=\"ql-format-button ql-strike\"></span>\n                </span>\n                <span class=\"ql-format-group\">\n                    <select title=\"Text Color\" class=\"ql-color\">\n                        <option value=\"rgb(0, 0, 0)\" label=\"rgb(0, 0, 0)\" selected=\"\"></option>\n                        <option value=\"rgb(230, 0, 0)\" label=\"rgb(230, 0, 0)\"></option>\n                        <option value=\"rgb(255, 153, 0)\" label=\"rgb(255, 153, 0)\"></option>\n                        <option value=\"rgb(255, 255, 0)\" label=\"rgb(255, 255, 0)\"></option>\n                        <option value=\"rgb(0, 138, 0)\" label=\"rgb(0, 138, 0)\"></option>\n                        <option value=\"rgb(0, 102, 204)\" label=\"rgb(0, 102, 204)\"></option>\n                        <option value=\"rgb(153, 51, 255)\" label=\"rgb(153, 51, 255)\"></option>\n                        <option value=\"rgb(255, 255, 255)\" label=\"rgb(255, 255, 255)\"></option>\n                        <option value=\"rgb(250, 204, 204)\" label=\"rgb(250, 204, 204)\"></option>\n                        <option value=\"rgb(255, 235, 204)\" label=\"rgb(255, 235, 204)\"></option>\n                        <option value=\"rgb(255, 255, 204)\" label=\"rgb(255, 255, 204)\"></option>\n                        <option value=\"rgb(204, 232, 204)\" label=\"rgb(204, 232, 204)\"></option>\n                        <option value=\"rgb(204, 224, 245)\" label=\"rgb(204, 224, 245)\"></option>\n                        <option value=\"rgb(235, 214, 255)\" label=\"rgb(235, 214, 255)\"></option>\n                        <option value=\"rgb(187, 187, 187)\" label=\"rgb(187, 187, 187)\"></option>\n                        <option value=\"rgb(240, 102, 102)\" label=\"rgb(240, 102, 102)\"></option>\n                        <option value=\"rgb(255, 194, 102)\" label=\"rgb(255, 194, 102)\"></option>\n                        <option value=\"rgb(255, 255, 102)\" label=\"rgb(255, 255, 102)\"></option>\n                        <option value=\"rgb(102, 185, 102)\" label=\"rgb(102, 185, 102)\"></option>\n                        <option value=\"rgb(102, 163, 224)\" label=\"rgb(102, 163, 224)\"></option>\n                        <option value=\"rgb(194, 133, 255)\" label=\"rgb(194, 133, 255)\"></option>\n                        <option value=\"rgb(136, 136, 136)\" label=\"rgb(136, 136, 136)\"></option>\n                        <option value=\"rgb(161, 0, 0)\" label=\"rgb(161, 0, 0)\"></option>\n                        <option value=\"rgb(178, 107, 0)\" label=\"rgb(178, 107, 0)\"></option>\n                        <option value=\"rgb(178, 178, 0)\" label=\"rgb(178, 178, 0)\"></option>\n                        <option value=\"rgb(0, 97, 0)\" label=\"rgb(0, 97, 0)\"></option>\n                        <option value=\"rgb(0, 71, 178)\" label=\"rgb(0, 71, 178)\"></option>\n                        <option value=\"rgb(107, 36, 178)\" label=\"rgb(107, 36, 178)\"></option>\n                        <option value=\"rgb(68, 68, 68)\" label=\"rgb(68, 68, 68)\"></option>\n                        <option value=\"rgb(92, 0, 0)\" label=\"rgb(92, 0, 0)\"></option>\n                        <option value=\"rgb(102, 61, 0)\" label=\"rgb(102, 61, 0)\"></option>\n                        <option value=\"rgb(102, 102, 0)\" label=\"rgb(102, 102, 0)\"></option>\n                        <option value=\"rgb(0, 55, 0)\" label=\"rgb(0, 55, 0)\"></option>\n                        <option value=\"rgb(0, 41, 102)\" label=\"rgb(0, 41, 102)\"></option>\n                        <option value=\"rgb(61, 20, 102)\" label=\"rgb(61, 20, 102)\"></option>\n                    </select>\n                    <span class=\"ql-format-separator\"></span>\n                    <select title=\"Background Color\" class=\"ql-background\">\n                        <option value=\"rgb(0, 0, 0)\" label=\"rgb(0, 0, 0)\"></option>\n                        <option value=\"rgb(230, 0, 0)\" label=\"rgb(230, 0, 0)\"></option>\n                        <option value=\"rgb(255, 153, 0)\" label=\"rgb(255, 153, 0)\"></option>\n                        <option value=\"rgb(255, 255, 0)\" label=\"rgb(255, 255, 0)\"></option>\n                        <option value=\"rgb(0, 138, 0)\" label=\"rgb(0, 138, 0)\"></option>\n                        <option value=\"rgb(0, 102, 204)\" label=\"rgb(0, 102, 204)\"></option>\n                        <option value=\"rgb(153, 51, 255)\" label=\"rgb(153, 51, 255)\"></option>\n                        <option value=\"rgb(255, 255, 255)\" label=\"rgb(255, 255, 255)\" selected=\"\"></option>\n                        <option value=\"rgb(250, 204, 204)\" label=\"rgb(250, 204, 204)\"></option>\n                        <option value=\"rgb(255, 235, 204)\" label=\"rgb(255, 235, 204)\"></option>\n                        <option value=\"rgb(255, 255, 204)\" label=\"rgb(255, 255, 204)\"></option>\n                        <option value=\"rgb(204, 232, 204)\" label=\"rgb(204, 232, 204)\"></option>\n                        <option value=\"rgb(204, 224, 245)\" label=\"rgb(204, 224, 245)\"></option>\n                        <option value=\"rgb(235, 214, 255)\" label=\"rgb(235, 214, 255)\"></option>\n                        <option value=\"rgb(187, 187, 187)\" label=\"rgb(187, 187, 187)\"></option>\n                        <option value=\"rgb(240, 102, 102)\" label=\"rgb(240, 102, 102)\"></option>\n                        <option value=\"rgb(255, 194, 102)\" label=\"rgb(255, 194, 102)\"></option>\n                        <option value=\"rgb(255, 255, 102)\" label=\"rgb(255, 255, 102)\"></option>\n                        <option value=\"rgb(102, 185, 102)\" label=\"rgb(102, 185, 102)\"></option>\n                        <option value=\"rgb(102, 163, 224)\" label=\"rgb(102, 163, 224)\"></option>\n                        <option value=\"rgb(194, 133, 255)\" label=\"rgb(194, 133, 255)\"></option>\n                        <option value=\"rgb(136, 136, 136)\" label=\"rgb(136, 136, 136)\"></option>\n                        <option value=\"rgb(161, 0, 0)\" label=\"rgb(161, 0, 0)\"></option>\n                        <option value=\"rgb(178, 107, 0)\" label=\"rgb(178, 107, 0)\"></option>\n                        <option value=\"rgb(178, 178, 0)\" label=\"rgb(178, 178, 0)\"></option>\n                        <option value=\"rgb(0, 97, 0)\" label=\"rgb(0, 97, 0)\"></option>\n                        <option value=\"rgb(0, 71, 178)\" label=\"rgb(0, 71, 178)\"></option>\n                        <option value=\"rgb(107, 36, 178)\" label=\"rgb(107, 36, 178)\"></option>\n                        <option value=\"rgb(68, 68, 68)\" label=\"rgb(68, 68, 68)\"></option>\n                        <option value=\"rgb(92, 0, 0)\" label=\"rgb(92, 0, 0)\"></option>\n                        <option value=\"rgb(102, 61, 0)\" label=\"rgb(102, 61, 0)\"></option>\n                        <option value=\"rgb(102, 102, 0)\" label=\"rgb(102, 102, 0)\"></option>\n                        <option value=\"rgb(0, 55, 0)\" label=\"rgb(0, 55, 0)\"></option>\n                        <option value=\"rgb(0, 41, 102)\" label=\"rgb(0, 41, 102)\"></option>\n                        <option value=\"rgb(61, 20, 102)\" label=\"rgb(61, 20, 102)\"></option>\n                    </select>\n                </span>\n                <span class=\"ql-format-group\">\n                    <span title=\"List\" class=\"ql-format-button ql-list\"></span>\n                    <span class=\"ql-format-separator\"></span>\n                    <span title=\"Bullet\" class=\"ql-format-button ql-bullet\"></span>\n                    <span class=\"ql-format-separator\"></span>\n                    <select title=\"Text Alignment\" class=\"ql-align\">\n                        <option value=\"left\" label=\"Left\" selected=\"\"></option>\n                        <option value=\"center\" label=\"Center\"></option>\n                        <option value=\"right\" label=\"Right\"></option>\n                        <option value=\"justify\" label=\"Justify\"></option>\n                        </select>\n                </span>\n                <span class=\"ql-format-group\">\n                <span title=\"Link\" class=\"ql-format-button ql-link\"></span>\n                </span>\n            </div>\n            <div class=\"ui-editor-content\"></div>\n        </div>\n    ",
            directives: [header_1.Header],
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler])
    ], Editor);
    return Editor;
})();
exports.Editor = Editor;
//# sourceMappingURL=editor.js.map