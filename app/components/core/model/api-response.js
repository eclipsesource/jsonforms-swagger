"use strict";
var APIResponse = (function () {
    function APIResponse() {
    }
    APIResponse.prototype.getCode = function () {
        return this.properties['code'];
    };
    APIResponse.prototype.getDescription = function () {
        return this.properties['description'];
    };
    APIResponse.prototype.hasSchema = function () {
        return this.properties['schema'] != undefined;
    };
    APIResponse.prototype.getSchema = function () {
        return this.properties['schema'];
    };
    return APIResponse;
}());
exports.APIResponse = APIResponse;
//# sourceMappingURL=api-response.js.map