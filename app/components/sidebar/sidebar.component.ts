import { Component } from '@angular/core';

import { IObserver } from '../../helpers/observer/observer.interface';

import { APIGeneratorService } from '../core/api-generator/api-generator.service';
import { ActiveOperationService } from '../core/active-operation/active-operation.service';
import { HeaderService } from '../header/header.service';

import { API } from '../core/model/api';
import { Operation } from '../core/model/operation';

import { JsonFormsAdapter } from '../../adapters/jsonforms.adapter';

import { PanelMenu } from 'primeng/primeng';



@Component({
  selector: 'sidebar',
  moduleId: module.id,
  templateUrl: 'sidebar.html',
  directives: [JsonFormsAdapter, PanelMenu],
  styleUrls: ['sidebar.css'],
})
export class SidebarComponent implements IObserver {

  devMode: boolean = false;

  // TODO: highlight the active operation in the UI using activeOperationId
  activeOperationId: string;

  api: API;

  constructor(private apiGeneratorService: APIGeneratorService, private activeOperationService: ActiveOperationService, private headerService: HeaderService) {
    activeOperationService.attach(this);

    headerService.devMode.subscribe((state: boolean)=>{
      this.devMode = state;
    });

    headerService.urlInput.subscribe((url: string)=>{
      this.generateAPI(url);
    });
  }

  generateAPI(url: string) {

    this.apiGeneratorService.getAPI(url)
      .subscribe(
        jsonAPI => {
          this.api = null;
          setTimeout(()=>{
            this.api = this.apiGeneratorService.generateAPI(jsonAPI);
            this.headerService.setErrorMessage(null);
          }, 0);
        },
        error => {
          this.headerService.setErrorMessage(<any>error);
          this.api = null;
        }
      );
  }

  update(notification: string) {
    if (notification == 'new active operation') {
      this.activeOperationId = this.activeOperationService.getActiveOperation().getOperationId();
    }
  }

  getOperationText(operation: Operation): string {
    if (this.devMode) {
      return operation.getType() + ' - ' + operation.getPath();
    } else {
      return operation.getSummary();
    }
  }

  onClickOperation(operation: Operation) {
    this.activeOperationService.setActiveOperation(operation, {});
  }

}
