import { Injectable } from '@angular/core';

import * as _ from 'lodash';

@Injectable()
export class ResponseDataschemaGeneratorService {

	generateDataschema(schema:{}):{} {
		let dataschema:{} = {};

		if (schema['type'] == 'array') {
			dataschema = {
				'type': 'object',
				'properties': {
					'table': schema
				}
			};
		} else {
			dataschema = schema;
		}

		return dataschema;
	}
}
