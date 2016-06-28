import { Injectable } from '@angular/core';

import * as _ from 'lodash';

@Injectable()
export class ResponseDataschemaGeneratorService {

  generateDataschema(schema: {}): {} {
    let dataschema: {} = {};

    if (schema['type'] == 'array') {
      dataschema = schema['items']; // TODO: include property of type arrray when jsonforms array control implemented
    } else {
      dataschema = schema;
    }

    return dataschema;
  }
}
