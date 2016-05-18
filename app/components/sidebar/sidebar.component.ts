import { Component, ViewChild } from '@angular/core';

import { IObserver } from '../../helpers/observer/observer.interface';

import { APIGeneratorService } from '../core/api-generator/api-generator.service';
import { ActiveOperationService } from '../core/active-operation/active-operation.service';
import { HeaderService } from '../header/header.service';

import { API } from '../core/model/api';
import { Operation } from '../core/model/operation';

import { JsonFormsAdapter } from '../../adapters/jsonforms.adapter';

import { PanelMenu } from 'primeng/primeng';
import {OverlayPanel} from 'primeng/primeng';
import Timer = NodeJS.Timer;


@Component({
  selector: 'sidebar',
  moduleId: module.id,
  templateUrl: 'sidebar.html',
  directives: [JsonFormsAdapter, PanelMenu, OverlayPanel],
  styleUrls: ['sidebar.css'],
})
export class SidebarComponent implements IObserver {

  @ViewChild('op') op: any;

  moreInfoActive: boolean = false;
  moreInfoTimeoutId: Timer = null;

  devMode: boolean = false;

  activeOperationId: string;

  api: API;

  constructor(private apiGeneratorService: APIGeneratorService, private activeOperationService: ActiveOperationService, private headerService: HeaderService) {
    activeOperationService.attach(this);

    headerService.devMode.subscribe((state: boolean)=>{
      this.devMode = state;
    });

    apiGeneratorService.api.subscribe((api: any)=>{
      this.headerService.setErrorMessage(null);
      this.api = api;
      console.log(api);
    }, (error: any)=>{
      console.log(error);
      this.headerService.setErrorMessage(error);
    });
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

  getTitle(): string{
    if(this.api && this.api.properties && this.api.properties['info'] && this.api.properties['info']['title']){
      return this.api.properties['info']['title'];
    }else {
      return null;
    }
  }

  getDescription(): string {
    if(this.api && this.api.properties && this.api.properties['info'] && this.api.properties['info']['description']){
      return this.api.properties['info']['description'];
    }else {
      return null;
    }
  }

  descriptionHoverIn($event: any, infoTarget: any){
    if(this.moreInfoActive){
      if(this.moreInfoTimeoutId){

        clearTimeout(this.moreInfoTimeoutId);
        this.moreInfoTimeoutId = null;
      }
    }else {
      this.op.show($event, infoTarget);
      this.moreInfoActive = true;
    }
  }
  descriptionHoverOut($event: any){

    this.moreInfoTimeoutId = setTimeout(()=>{
      this.op.hide($event);
      this.moreInfoTimeoutId = null;
      this.moreInfoActive = false;

    }, 1000);
  }

}
