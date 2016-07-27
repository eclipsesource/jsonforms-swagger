import { Injectable } from '@angular/core';

import * as _ from 'lodash';

import { Parameter } from '../model/parameter';

@Injectable()
export class QueryDataschemaGeneratorService {

    generateDataschema(parameters: Parameter[]): {} {
        let dataschema: {} = {
            'type': 'object',
            'properties': {}
        };

        _.forEach(parameters, (parameter: Parameter) => {
            if (parameter.getIn() == 'body') {
                dataschema['properties'][parameter.getName()] = parameter.getSchema();
            } else if (parameter.getType() != 'file') { // TODO: implement file type
                dataschema['properties'][parameter.getName()] = _.pick(parameter.properties, ['type', 'format', 'items', 'enum']);
				if (parameter.properties['required']) {
					if (!dataschema['required']) {
						dataschema['required'] = [];
					}
					dataschema['required'].push(parameter.getName());
				}
            }
        });

        return dataschema;
    }
}