import { Injectable } from '@angular/core';

import * as _ from 'lodash';

import { Parameter } from '../model/parameter';

@Injectable()
export class DataGeneratorService {

	generateData(parameters: Parameter[], initialData: {}): {} {
		let data: {} = {};

		_.forEach(parameters, (parameter: Parameter) => {
			if (parameter.properties['default']) {
				data[parameter.getName()] = parameter.properties['default'];
			}
		});

		_.forEach(initialData, (value: any, key: string) => {
			data[key] = value;
		});

		return data;
	}
}