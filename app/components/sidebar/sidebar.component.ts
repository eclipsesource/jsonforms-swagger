import { Component } from '@angular/core';

import { IObserver } from '../../helpers/observer/observer.interface';

import { APIGeneratorService } from '../core/api-generator/api-generator.service';
import { ActiveOperationService } from '../core/active-operation/active-operation.service';
import { API } from '../core/model/api';

@Component({
  selector: 'my-sidebar',
  templateUrl: 'app/components/sidebar/sidebar.component.html'
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
