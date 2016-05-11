"use strict";
var Tag = (function () {
    function Tag() {
        this.operations = [];
    }
    Tag.prototype.getName = function () {
        return this.properties['name'];
    };
    return Tag;
}());
exports.Tag = Tag;
//# sourceMappingURL=tag.js.map