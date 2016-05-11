"use strict";
var app_component_1 = require('./app.component');
var upgrade_adapter_1 = require('./adapters/upgrade_adapter');
require('rxjs/Rx');
angular.module('app-legacy', ['jsonforms'])
    .directive('app', upgrade_adapter_1.upgradeAdapter.downgradeNg2Component(app_component_1.AppComponent));
function main() {
    try {
        upgrade_adapter_1.upgradeAdapter.bootstrap(document.body, ['app-legacy']);
    }
    catch (e) {
        console.error(e);
    }
}
exports.main = main;
//# sourceMappingURL=main.js.map