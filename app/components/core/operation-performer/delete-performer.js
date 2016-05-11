"use strict";
var DeletePerformer = (function () {
    function DeletePerformer() {
    }
    DeletePerformer.prototype.performOperation = function (http, url, body, options) {
        return http.delete(url, options);
    };
    return DeletePerformer;
}());
exports.DeletePerformer = DeletePerformer;
//# sourceMappingURL=delete-performer.js.map