import { enableProdMode } from '@angular/core';

import { AppComponent } from './app/app.component.ts';
import { upgradeAdapter } from './adapters/upgrade_adapter';

import './jsonforms-extensions/table-control/table-control.ts';

declare var angular: any;

if (process.env.ENV === 'production') {
	enableProdMode();
}

angular.module('app-legacy', ['jsonforms', 'ui.bootstrap'])
	.directive('app', upgradeAdapter.downgradeNg2Component(AppComponent));

upgradeAdapter.bootstrap(document.body, ['app-legacy']);