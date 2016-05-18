import {Component} from '@angular/core';
import {APIGeneratorService} from "../core/api-generator/api-generator.service";
import {Tag} from "../core/model/tag";

@Component({
  selector: 'explorer',
  moduleId: module.id,
  styleUrls: ['explorer.css'],
  templateUrl: 'explorer.html'
})
export class ExplorerComponent{
  api: any = null;
  constructor(apiGeneratorService: APIGeneratorService){
    apiGeneratorService.api.subscribe((api)=>{
      this.api = api;
    });
  }

  find(entity: Tag){
    console.log(entity);
  }

  add(entity: Tag){
    console.log(entity);
  }
}
