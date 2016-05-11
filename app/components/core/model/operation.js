"use strict";
var Operation = (function () {
    function Operation() {
        this.parameters = [];
        this.responses = [];
    }
    Operation.prototype.getType = function () {
        return this.properties['type'];
    };
    Operation.prototype.getPath = function () {
        return this.properties['path'];
    };
    Operation.prototype.getUrl = function () {
        return this.properties['baseUrl'] + this.properties['path'];
    };
    Operation.prototype.getOperationId = function () {
        return this.properties['operationId'];
    };
    Operation.prototype.getParameters = function () {
        return this.parameters;
    };
    Operation.prototype.getParameterByName = function (name) {
        return _.find(this.parameters, function (parameter) {
            return parameter.getName() == name;
        });
    };
    Operation.prototype.getResponses = function () {
        return this.responses;
    };
    Operation.prototype.getResponseByCode = function (code) {
        return _.find(this.responses, function (response) {
            return response.getCode() == code;
        });
    };
    return Operation;
}());
exports.Operation = Operation;
//# sourceMappingURL=operation.js.map