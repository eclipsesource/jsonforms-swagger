"use strict";
var PostPerformer = (function () {
    function PostPerformer() {
    }
    PostPerformer.prototype.performOperation = function (http, url, body, options) {
        return http.post(url, body, options);
    };
    return PostPerformer;
}());
exports.PostPerformer = PostPerformer;
//# sourceMappingURL=post-performer.js.map