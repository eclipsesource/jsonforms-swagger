import { Injectable } from '@angular/core';
import {Parameter} from "../model/parameter";

@Injectable()
export class DataschemaGeneratorService {

  private typeConversions: {[key: string]: string} = {
    'file': 'string'
  };

  private emptyDataschema : any = {
    'type': 'object',
    'properties': {
    }
  };

  generateDataschema(parameters: Parameter[]): any{
    var dataschema = Object.assign({}, this.emptyDataschema);
    var requiredProperties: string[] = [];

    parameters.forEach((parameter)=>{

      var type = parameter.type;
      if(type===undefined){
        return;
      }

      if(this.typeConversions[parameter.type] !== undefined){
        type = this.typeConversions[parameter.type];
      }
      if(type === 'body'){
        parameter = parameter['schema'];
      }

      dataschema['properties'][parameter.name] = {
        'type': parameter.type
      };

      if(parameter.required){
        requiredProperties.push(parameter.name);
      }
    });

    if(requiredProperties.length > 0){
      dataschema['required'] = requiredProperties;
    }

    return dataschema;
  }
}
