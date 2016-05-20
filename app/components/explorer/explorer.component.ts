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

  activeOperationId: string = null;
  opTypes: any[] = [{
    id: 'findOperations',
    label: 'Find'
  }, {
    id: 'addOperations',
    label: 'Add'
  }];

  selectedType: string = null;
  selectedDefinition: any = null;

  api: any = null;
  constructor(apiGeneratorService: APIGeneratorService, private activeOperationService: ActiveOperationService){
    apiGeneratorService.api.subscribe((api)=>{
      this.api = api;
    });
    activeOperationService.activeOperation.subscribe((op)=>{
      if(!op){
        return;
      }
      this.activeOperationId = op.getOperationId();
    });
  }

  selectOps(definition: any, operation: string){
    if(!operation || !definition){
      return;
    }
    this.selectedDefinition = definition;
    this.selectedType = operation;
    var operations = definition[operation];
    //TODO poner pestañas en vez de cargar solo la primera
    this.activeOperationService.setActiveOperation(operations[0], {});

  }

  getDefinitions(): any[]{
    return _.filter(this.api.definitions, (def)=>{
      return this.hasAnyOp(def);
    });
  }

  isSelected(definition: any, type: string): boolean {
    return (this.selectedDefinition === definition && this.selectedType === type);
  }

  hasAnyOp(definition: any){
    return this.opTypes.some((opType)=>{
      if(this.hasOps(definition, opType.id)){
        return true;
      }
    });
  }

  getOperationTypes(definition: any): any[]{
    return _.filter(this.opTypes, (opType)=>{
      return this.hasOps(definition, opType.id);
    });
  }

  hasOps(definition: any, type: string){
    if(!definition || !type){
      return false;
    }
    if(definition[type] && definition[type].length > 0){
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
