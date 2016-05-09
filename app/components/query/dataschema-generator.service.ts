import { Injectable } from '@angular/core';

import { Parameter } from "../core/model/parameter";

@Injectable()
export class DataschemaGeneratorService {

  generateDataschema(parameters: Parameter[]): {} {
    let dataschema: {} = {
      'type': 'object',
      'properties': {}
    };

    _.forEach(parameters, (parameter: Parameter) => {
      if (parameter.getIn() == 'body') {
        dataschema['properties'][parameter.getName()] = parameter.getSchema();
      } else if (parameter.getType() != 'file') { // TODO: implement file type
        dataschema['properties'][parameter.getName()] = _.pick(parameter.properties, ['type', 'required', 'format', 'items']);
      }
    });

    return dataschema;
  }
}
