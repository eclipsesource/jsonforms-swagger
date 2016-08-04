import { Injectable } from '@angular/core';

import * as _ from 'lodash';

@Injectable()
export class ResponseUischemaGeneratorService {

	generateUischema(dataschema: {}): {} {
		console.log(dataschema);
		let uischema: {} = {
			'type': 'VerticalLayout',
			'elements': []
		};

		_.forEach(dataschema['properties'], (property: any, name: string) => {
			if (property['type'] == 'array') {
				this.addFirstLevelArrayProperty(uischema['elements'], property, name, '#/properties/');
				return false;
			} else {
				this.addProperty(uischema['elements'], property, name, '#/properties/');
			}
		});

		console.log(uischema);
		return uischema;
	}

	addProperty(layoutElements: {}[], property: {}, name: string, path: string) {
		if (property['type'] == 'object') {
			let sublayout: {} = {
				'type': 'Group',
				'label': _.upperFirst(name),
				'elements': []
			};
			_.forEach(property['properties'], (subproperty: any, subname: string) => {
				this.addProperty(sublayout['elements'], subproperty, subname, path + name + '/properties/');
			});
			layoutElements.push(sublayout);
		} else {
			let control: {} = {
				'type': 'Control',
				'label': _.upperFirst(name),
				'scope': {
					'$ref': path + name
				}
			};
			layoutElements.push(control);
		}
	}

	addFirstLevelArrayProperty(layoutElements: {}[], property: {}, name: string, path: string) {
		let control: {} = {
			'type': 'Control',
			'options': {
				'primaryItems': this.choosePrimaryItems(property['items'])
			},
			'scope': {
				'$ref': path + name
			}
		};
		layoutElements.push(control);
	}

	choosePrimaryItems(items: {}): string[] {
		let res: string[] = [];
		let count: number = 0;
		_.forEach(items['properties'], (property: {}, propertyName: string) => {
			if (property['type'] != 'object' && property['type'] != 'array') {
				res.push(propertyName);
				count++;
			}
			if (count >= 2) {
				return false;
			}
		});
		return res;
	}

}