"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ActiveOperationService = (function () {
    function ActiveOperationService() {
        this.observers = [];
    }
    ActiveOperationService.prototype.attach = function (observer) {
        this.observers.push(observer);
    };
    ActiveOperationService.prototype.detach = function (observer) {
        var index = this.observers.indexOf(observer);
        if (index >= 0) {
            this.observers.splice(index, 1);
        }
    };
    ActiveOperationService.prototype.notify = function (notification) {
        for (var i = 0; i < this.observers.length; i++) {
            this.observers[i].update(notification);
        }
    };
    ActiveOperationService.prototype.getActiveOperation = function () {
        return this.activeOperation;
    };
    ActiveOperationService.prototype.setActiveOperation = function (op) {
        if (!this.activeOperation || op.getOperationId() != this.activeOperation.getOperationId()) {
            this.activeOperation = op;
            this.notify('new active operation');
        }
    };
    ActiveOperationService.prototype.responseReady = function (res) {
        this.response = res;
        this.notify('response ready');
    };
    ActiveOperationService.prototype.getResponse = function () {
        return this.response;
    };
    ActiveOperationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ActiveOperationService);
    return ActiveOperationService;
}());
exports.ActiveOperationService = ActiveOperationService;
//# sourceMappingURL=active-operation.service.js.map