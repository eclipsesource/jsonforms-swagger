import { Injectable } from '@angular/core';

import { APIResponse } from '../model/api-response';

@Injectable()
export class ResponseDataschemaGeneratorService {

  generateDataschema(response: APIResponse): {} {
    let dataschema: {} = {
      'type': 'object',
      'properties': {}
    };



    return dataschema;
  }
}
