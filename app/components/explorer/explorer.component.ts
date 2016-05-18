import {Component} from '@angular/core';
import {APIGeneratorService} from "../core/api-generator/api-generator.service";
import {Tag} from "../core/model/tag";
import {Operation} from "../core/model/operation";

@Component({
  selector: 'explorer',
  moduleId: module.id,
  styleUrls: ['explorer.css'],
  templateUrl: 'explorer.html'
})
export class ExplorerComponent{
  api: any = null;
  definitionReferences: any = null;
  constructor(apiGeneratorService: APIGeneratorService){
    apiGeneratorService.api.subscribe((api)=>{
      this.api = api;
    });
    apiGeneratorService.definitionReferences.subscribe((definitionRef)=>{
      this.definitionReferences = definitionRef;
    })
  }

  // Taking all the operations that produce the selected definition with the method GET
  find(definition: string){
    var findOperations: Operation[] = [];
    var defKey = '#/definitions/' + definition;
    if(this.definitionReferences[defKey]){
      var producerOperations = _.map(this.definitionReferences[defKey].produces, (op)=>{
        return this.api.getOperationById(op);
      });
      _.forEach(producerOperations, (op)=>{
        if(op['properties']['type'] === 'get'){
          findOperations.push(op);
        }
      });
    }

  }
  // Taking all the operations that consume the selected definition with the method POST
  add(definition: string){
    var addOperations: Operation[] = [];
    var defKey = '#/definitions/' + definition;
    if(this.definitionReferences[defKey]){
      var consumerOperations = _.map(this.definitionReferences[defKey].consumes, (op)=>{
        return this.api.getOperationById(op);
      });
      _.forEach(consumerOperations, (op)=>{
        if(op['properties']['type'] === 'post'){
          addOperations.push(op);
        }
      });
    }

  }
}
