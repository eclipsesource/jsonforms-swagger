import {Component, ViewChild} from '@angular/core';
import {APIGeneratorService} from "../core/api-generator/api-generator.service";
import {Tag} from "../core/model/tag";
import {Operation} from "../core/model/operation";
import {ActiveOperationService} from "../core/active-operation/active-operation.service";

import { Pipe, PipeTransform } from '@angular/core';
import Timer = NodeJS.Timer;
import {PanelMenu} from "../../../node_modules/primeng/components/panelmenu/panelmenu";
import {OverlayPanel} from "../../../node_modules/primeng/components/overlaypanel/overlaypanel";
@Component({
  selector: 'explorer',
  moduleId: module.id,
  styleUrls: ['explorer.css'],
  templateUrl: 'explorer.html',
  directives: [PanelMenu, OverlayPanel]
})
export class ExplorerComponent{

  @ViewChild('op') op: any;

  moreInfoActive: boolean = false;
  moreInfoTimeoutId: Timer = null;

  addOperations: Operation[] = [];
  findOperations: Operation[] = [];

  api: any = null;
  constructor(apiGeneratorService: APIGeneratorService, private activeOperationService: ActiveOperationService){
    apiGeneratorService.api.subscribe((api)=>{
      this.api = api;
    });
  }


  find(definition: any){
    this.findOperations = definition['findOperations'];
    //TODO poner pestañas en vez de cargar solo la primera
    this.activeOperationService.setActiveOperation(this.findOperations[0], {});

  }

  add(definition: any){
    this.addOperations = definition['addOperations'];
    //TODO poner pestañas en vez de cargar solo la primera
    this.activeOperationService.setActiveOperation(this.addOperations[0], {});
  }

  getDefinitions(): any[]{
    return _.filter(this.api.definitions, (def)=>{
      return this.hasOps(def);
    });
  }

  hasOps(definition: any){
    return this.hasFindOps(definition) || this.hasAddOps(definition);
  }

  hasFindOps(definition: any){
    if(!definition){
      return false;
    }
    if(definition['findOperations'] && definition['findOperations'].length > 0){
      return true;
    }
    return false;
  }

  hasAddOps(definition:any){
    if(!definition){
      return false;
    }
    if(definition['addOperations'] && definition['addOperations'].length > 0){
      return true;
    }
    return false;
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
