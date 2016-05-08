import { Component } from '@angular/core';

import { IObserver } from '../../helpers/observer/observer.interface';

import { APIGeneratorService } from '../core/api-generator/api-generator.service';
import { ActiveOperationService } from '../core/active-operation/active-operation.service';
import { API } from '../core/model/api';
import {JsonFormsAdapter} from '../../adapters/jsonforms.adapter';
import {PanelMenu} from 'primeng/primeng';


@Component({
  selector: 'sidebar',
  moduleId: module.id,
  templateUrl: 'sidebar.html',
  directives: [JsonFormsAdapter, PanelMenu],
  styleUrls: ['sidebar.css']
})
export class SidebarComponent implements IObserver {

  constructor(private apiGeneratorService: APIGeneratorService, private activeOperationService: ActiveOperationService) {
    activeOperationService.attach(this);
  }

  // TODO: highlight the active operation in the UI
  activeOperationId: string;

  errorMessage: string;
  api: API;

  generateAPI(url: string) {
    this.apiGeneratorService.getAPI(url)
      .subscribe(
        jsonAPI => {
          this.api = this.apiGeneratorService.generateAPI(jsonAPI);
          this.errorMessage = null;
        },
        error => {
          this.errorMessage = <any>error;
          this.api = null;
        }
      );
  }

  update() {
    this.activeOperationId = this.activeOperationService.getActiveOperation().getOperationId();
  }

}
