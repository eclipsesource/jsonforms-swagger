"use strict";
var Operation = (function () {
    function Operation() {
        this.parameters = [];
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
            return parameter.properties['name'] == name;
        });
    };
    return Operation;
}());
exports.Operation = Operation;
//# sourceMappingURL=operation.js.map