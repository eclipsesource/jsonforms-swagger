import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { QueryComponent } from './components/query/query.component';

import { APIGeneratorService } from './components/core/api-generator/api-generator.service';
import { ActiveOperationService } from './components/core/active-operation/active-operation.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives: [SidebarComponent, QueryComponent],
  providers: [
    HTTP_PROVIDERS,
    APIGeneratorService,
    ActiveOperationService
  ]
})
export class AppComponent { }
