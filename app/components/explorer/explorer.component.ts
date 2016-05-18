import {Component} from '@angular/core';
import {APIGeneratorService} from "../core/api-generator/api-generator.service";
import {Tag} from "../core/model/tag";
import {Operation} from "../core/model/operation";
import {ActiveOperationService} from "../core/active-operation/active-operation.service";

import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'explorer',
  moduleId: module.id,
  styleUrls: ['explorer.css'],
  templateUrl: 'explorer.html'
})
export class ExplorerComponent{
  api: any = null;
  constructor(apiGeneratorService: APIGeneratorService, private activeOperationService: ActiveOperationService){
    apiGeneratorService.api.subscribe((api)=>{
      this.api = api;
    });
  }


  find(definition: any){
    var findOperations = definition['findOperations'];
    //TODO poner pestañas en vez de cargar solo la primera
    this.activeOperationService.setActiveOperation(findOperations[0], {});

  }

  add(definition: any){
    var addOperations = definition['addOperations'];
    //TODO poner pestañas en vez de cargar solo la primera
    this.activeOperationService.setActiveOperation(addOperations[0], {});
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
}
