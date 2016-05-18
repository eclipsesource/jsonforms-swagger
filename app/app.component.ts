import {Component} from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { QueryComponent } from './components/query/query.component';
import { ResponseComponent } from './components/response/response.component';
import { APIGeneratorService } from './components/core/api-generator/api-generator.service';
import { ActiveOperationService } from './components/core/active-operation/active-operation.service';
import { OperationPerformerService } from './components/core/operation-performer/operation-performer.service';
import {HeaderService} from "./components/header/header.service";
import 'lodash';
import {ExplorerComponent} from "./components/explorer/explorer.component";

@Component({
  selector: 'app',
  moduleId: module.id,
  templateUrl: 'app.html',
  styleUrls: ['app.css'],
  directives: [SidebarComponent, HeaderComponent, QueryComponent, ResponseComponent, ExplorerComponent],
  providers: [
    HTTP_PROVIDERS,
    APIGeneratorService,
    ActiveOperationService,
    OperationPerformerService,
    HeaderService
  ]
})
export class AppComponent{
  devMode = false;
  constructor(headerService: HeaderService){
    headerService.devMode.subscribe((value:boolean)=>{
      this.devMode = value;
    });
  }
}
