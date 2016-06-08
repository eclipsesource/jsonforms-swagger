import { Component, ViewChild } from '@angular/core';

import { APIGeneratorService } from '../core/api-generator/api-generator.service';
import { ActiveOperationService } from '../core/active-operation/active-operation.service';
import { HeaderService } from '../header/header.service';

import { API } from '../core/model/api';
import { Operation } from '../core/model/operation';

import { PanelMenu } from 'primeng/primeng';
import {OverlayPanel} from 'primeng/primeng';
import Timer = NodeJS.Timer;


@Component({
  selector: 'sidebar',
  moduleId: module.id,
  templateUrl: 'sidebar.html',
  directives: [PanelMenu, OverlayPanel],
  styleUrls: ['sidebar.css'],
})
export class SidebarComponent {

  @ViewChild('op') op: any;

  moreInfoActive: boolean = false;
  moreInfoTimeoutId: Timer = null;

  devMode: boolean = false;

  activeOperationId: string;

  api: API;

  constructor(private apiGeneratorService: APIGeneratorService, private activeOperationService: ActiveOperationService, private headerService: HeaderService) {

    activeOperationService.activeOperation.subscribe((op)=>{
      if(!op){
        return;
      }
      this.activeOperationId = op.getOperationId();
    });

    headerService.devMode.subscribe((state: boolean)=>{
      this.devMode = state;
    });

    apiGeneratorService.api.subscribe((api: any)=>{
      this.headerService.setErrorMessage(null);
      this.api = api;
    }, (error: any)=>{
      this.headerService.setErrorMessage(error);
    });
  }

  getOperationText(operation: Operation): string {
    if (this.devMode) {
      return operation.getType() + ' - ' + operation.getPath();
    } else {
      return operation.getSummary();
    }
  }

  onClickOperation(operation: Operation) {
    this.activeOperationService.setOperation(operation);
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
