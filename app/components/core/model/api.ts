import * as _ from 'lodash';

import { Operation } from './operation';
import { EntityType } from './entity-type';
import { Action } from './action';

export class API {

	properties: {} = {};
	tags: string[] = [];
	operations: Operation[] = [];
	entityTypes: EntityType[] = [];

	getTitle() {
		return this.properties['info']['title'];
	}

	getDescription() {
		return this.properties['info']['description'];
	}

	getBaseUrl(): string {
		let baseUrl = this.properties['schemes'][0] + '://' + this.properties['host'] + this.properties['basePath'];
		if (baseUrl.endsWith('/')) {
			baseUrl = baseUrl.substring(0, baseUrl.length - 1);
		}
		return baseUrl;
	}

	getEntityTypeByName(name: string): EntityType {
		return _.find(this.entityTypes, (entityType: EntityType) => {
			return entityType.name == name;
		});
	}

	getActionByOperation(operation:Operation): Action { // If the operation is present in more than one action, returns only one of them. If it's not present in any action, returns undefined
		let action: Action;
		_.forEach(this.entityTypes, (entityType: EntityType) => {
			action = entityType.getActionByOperation(operation);
			if (action) {
				return false;
			}
		});
		return action;
	}

	getOperationById(id:string): Operation {
		return _.find(this.operations, (operation: Operation) => {
			return operation.getOperationId() == id;
		});
	}

	getOperationByPathAndType(path: string, type: string): Operation {
		return _.find(this.operations, (operation: Operation) => {
			return operation.getPath() == path && operation.getType() == type;
		});
	}

	getOperationsByTag(tag:string): Operation[] {
		if (tag == 'default' && this.tags.length == 1) {
			return this.operations;
		}

		return _.filter(this.operations, (operation: Operation) => {
			return operation.getTags().indexOf(tag) >= 0;
		});
	}

	generateAPIModel(): {} {
		let apiModel: {} = {};

		apiModel['entityTypes'] = [];
		let i = 0;
		let j = 0;
		_.forEach(this.entityTypes, (entityType: EntityType) => {
			apiModel['entityTypes'].push({
				'name': entityType.name,
				'actions': []
			});
			j = 0;
			_.forEach(entityType.actions, (action: Action) => {
				apiModel['entityTypes'][i]['actions'].push({
					'name': action.name,
					'operations': []
				});
				_.forEach(action.operations, (operation: Operation) => {
					apiModel['entityTypes'][i]['actions'][j]['operations'].push({
						'type': operation.getType(),
						'path': operation.getPath()
					})
				});
				j++;
			});
			i++;
		});

		return apiModel;
	}

}
