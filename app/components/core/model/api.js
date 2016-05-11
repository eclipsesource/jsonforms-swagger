"use strict";
var API = (function () {
    function API() {
        this.tags = [];
    }
    API.prototype.getBaseUrl = function () {
        return 'http://' + this.properties['host'] + this.properties['basePath'];
    };
    API.prototype.getTagByName = function (name) {
        return _.find(this.tags, function (tag) {
            return tag.properties['name'] == name;
        });
    };
    return API;
}());
exports.API = API;
//# sourceMappingURL=api.js.map