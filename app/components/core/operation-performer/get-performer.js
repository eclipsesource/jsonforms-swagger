"use strict";
var GetPerformer = (function () {
    function GetPerformer() {
    }
    GetPerformer.prototype.performOperation = function (http, url, body, options) {
        return http.get(url, options);
    };
    return GetPerformer;
}());
exports.GetPerformer = GetPerformer;
//# sourceMappingURL=get-performer.js.map