"use strict";
var Parameter = (function () {
    function Parameter() {
    }
    Parameter.prototype.getName = function () {
        return this.properties['name'];
    };
    Parameter.prototype.getIn = function () {
        return this.properties['in'];
    };
    Parameter.prototype.getType = function () {
        return this.properties['type'];
    };
    Parameter.prototype.getSchema = function () {
        return this.properties['schema'];
    };
    return Parameter;
}());
exports.Parameter = Parameter;
//# sourceMappingURL=parameter.js.map