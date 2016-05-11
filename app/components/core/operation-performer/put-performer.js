"use strict";
var PutPerformer = (function () {
    function PutPerformer() {
    }
    PutPerformer.prototype.performOperation = function (http, url, body, options) {
        return http.put(url, body, options);
    };
    return PutPerformer;
}());
exports.PutPerformer = PutPerformer;
//# sourceMappingURL=put-performer.js.map