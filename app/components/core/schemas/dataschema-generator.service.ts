import { Injectable } from '@angular/core';
import {Parameter} from "../model/parameter";

@Injectable()
export class DataschemaGeneratorService {

  generateDataschema(parameters: Parameter[]): any{

    let dataschema: any = {
      'type': 'object',
      'properties': {}
    };

    let requiredProperties: string[] = [];

    parameters.forEach((parameter)=>{

      var type = parameter.type;

      //TODO implement arrays and files
      if(type===undefined || type==='array' || type === 'file'){
        return;
      }

      if(type === 'body'){
        parameter = parameter['schema'];
      }

      dataschema['properties'][parameter.name] = {
        'type': type
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
