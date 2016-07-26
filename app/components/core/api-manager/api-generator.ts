declare var JsonRefs:any;

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { API } from '../model/api';
import { Operation } from '../model/operation';
import { Parameter } from '../model/parameter';
import { APIResponse } from '../model/api-response';
import { EntityType } from '../model/entity-type';
import { Action } from '../model/action';

@Injectable()
export class APIGenerator {

	constructor(private http:Http) {
	}

	getJSONAPI(url:string):Observable<{}> {
		return this.http.get(url)
			.map(this.extractData)
			.catch(this.handleError);
	}

	private extractData(res:Response) {
		if (res.status < 200 || res.status >= 300) {
			throw new Error('Bad response status: ' + res.status);
		}
		return res.json();
	}

	private handleError(error:any) {
		let errMsg = error.message || 'Server error';
		return Observable.throw(errMsg);
	}

	generateAPI(jsonAPI:{}, apiModel:{}):API {
		let api = new API();
		api.properties = _.pick(jsonAPI, ['schemes', 'info', 'host', 'basePath']);
		this.generateTags(api, jsonAPI);
		this.generateOperations(api, jsonAPI);
		const definitionsUsages = this.computeDefinitionsUsages(jsonAPI);
		this.generateRelatedOperations(api, definitionsUsages);
		this.generateEntityTypes(api, definitionsUsages, apiModel);
		this.generateSecurityDefinitions(api, jsonAPI);
		return api;
	}

	private generateTags(api:API, jsonAPI:{}) {
		_.forEach(jsonAPI['paths'], (jsonPath:{}) => {
			_.forEach(jsonPath, (jsonOperation:{}) => {
				_.forEach(jsonOperation['tags'], (tag:string) => {
					if (api.tags.indexOf(tag) < 0) {
						api.tags.push(tag);
					}
				});
			});
		});

		if (api.tags.length == 0) {
			api.tags.push('default');
		}
	}

	private generateOperations(api:API, jsonAPI:{}) {
		let resolvedJsonAPI:{};
		JsonRefs.resolveRefs(jsonAPI, {}, function (err:any, res:any) {
			resolvedJsonAPI = res;
		});

		let baseUrl = api.getBaseUrl();
		_.forEach(resolvedJsonAPI['paths'], (jsonPath:{}, path:string) => {
			_.forEach(jsonPath, (jsonOperation:{}, operationType:string) => {
				this.generateOperation(api, baseUrl, path, operationType, jsonOperation);
			});
		});
	}

	private generateOperation(api:API, baseUrl:string, path:string, type:string, jsonOperation:{}) {
		let operation:Operation = new Operation();
		operation.properties = _.pick(jsonOperation, ['tags', 'summary', 'description', 'operationId', 'security']);
		operation.properties['baseUrl'] = baseUrl;
		operation.properties['path'] = path;
		operation.properties['type'] = type;

		this.generateParameters(operation, jsonOperation);
		this.generateResponses(operation, jsonOperation);

		api.operations.push(operation);
	}

	private generateParameters(operation:Operation, jsonOperation:{}) {
		_.forEach(jsonOperation['parameters'], (jsonParameter:{}) => {
			let parameter:Parameter = new Parameter();
			parameter.properties = jsonParameter;

			operation.parameters.push(parameter);
		});
	}

	private generateResponses(operation:Operation, jsonOperation:{}) {
		_.forEach(jsonOperation['responses'], (jsonResponse, code) => {
			let response:APIResponse = new APIResponse();
			response.properties = jsonResponse;
			response.properties['code'] = code;

			operation.responses.push(response);
		});
	}

	private computeDefinitionsUsages(jsonAPI:{}):{} {
		let definitionsUsages:{} = {};

		_.forEach(jsonAPI['paths'], (jsonPath:{}, path:string) => {
			_.forEach(jsonPath, (jsonOperation:{}, operationType:string) => {

				_.forEach(jsonOperation['parameters'], (jsonParameter:{}) => {
					if (jsonParameter['schema'] && jsonParameter['schema']['$ref']) {
						let definitionRef:string = jsonParameter['schema']['$ref'].substring(('#/definitions/').length);
						if (!definitionsUsages[definitionRef]) {
							definitionsUsages[definitionRef] = {consumes: [], produces: []};
						}
						definitionsUsages[definitionRef]['consumes'].push({path: path, type: operationType});
					}
				});

				_.forEach(jsonOperation['responses'], (jsonResponse:{}) => {
					let definitionRef:string;
					if (jsonResponse['schema']) {
						if (jsonResponse['schema']['$ref']) {
							definitionRef = jsonResponse['schema']['$ref'];
						} else if (jsonResponse['schema']['items'] && jsonResponse['schema']['items']['$ref']) {
							definitionRef = jsonResponse['schema']['items']['$ref'];
						}
					}
					if (definitionRef) {
						definitionRef = definitionRef.substring(('#/definitions/').length);
						if (!definitionsUsages[definitionRef]) {
							definitionsUsages[definitionRef] = {consumes: [], produces: []};
						}
						definitionsUsages[definitionRef]['produces'].push({path: path, type: operationType});
					}
				});

			});
		});

		return definitionsUsages;
	}

	private generateRelatedOperations(api:API, definitionsUsages:{}) {
		_.forEach(definitionsUsages, (definitionUsage:{}) => {
			_.forEach(definitionUsage['produces'], (operationPathAndType:{}) => {
				let producesOperation:Operation = api.getOperationByPathAndType(operationPathAndType['path'], operationPathAndType['type']);
				_.forEach(definitionUsage['consumes'], (operationPathAndType:{}) => {
					let consumesOperation:Operation = api.getOperationByPathAndType(operationPathAndType['path'], operationPathAndType['type']);
					producesOperation.relatedOperations.push(consumesOperation);
				});
			});
		});
	}

	private generateEntityTypes(api: API, definitionUsages: {}, apiModel: {}) {
		if (_.isEmpty(apiModel)) {
			this.generateEntityTypesFromDefinitionsUsages(api, definitionUsages);
			apiModel = api.generateAPIModel();
		} else {
			this.generateEntityTypesFromAPIModel(api, apiModel);
		}
	}

	private generateEntityTypesFromDefinitionsUsages(api:API, definitionsUsages:{}) {
		_.forEach(definitionsUsages, (definitionUsage:{}, definitionName:string) => {
			let entityType:EntityType = new EntityType();
			entityType.name = definitionName;

			let findAction:Action = new Action();
			findAction.name = 'Find ' + definitionName;
			_.forEach(definitionUsage['produces'], (operationPathAndType:{}) => {
				if (operationPathAndType['type'] == 'get') {
					let getOperation = api.getOperationByPathAndType(operationPathAndType['path'], operationPathAndType['type']);
					findAction.operations.push(getOperation);
				}
			});
			if (findAction.operations.length > 0) {
				entityType.actions.push(findAction);
			}

			let createAction:Action = new Action();
			createAction.name = 'Create ' + definitionName;
			_.forEach(definitionUsage['consumes'], (operationPathAndType:{}) => {
				if (operationPathAndType['type'] == 'post') {
					let postOperation = api.getOperationByPathAndType(operationPathAndType['path'], operationPathAndType['type']);
					createAction.operations.push(postOperation);
				}
			});
			if (createAction.operations.length > 0) {
				entityType.actions.push(createAction);
			}

			api.entityTypes.push(entityType);
		});
	}

	private generateEntityTypesFromAPIModel(api: API, apiModel: {}) {
		_.forEach(apiModel['entityTypes'], (entityTypeModel: {}) => {
			let entityType: EntityType = new EntityType();
			entityType.name = entityTypeModel['name'];

			_.forEach(entityTypeModel['actions'], (actionModel: {}) => {
				let action: Action = new Action();
				action.name = actionModel['name'];

				_.forEach(actionModel['operations'], (operationModel: {}) => {
					let operation: Operation = api.getOperationByPathAndType(operationModel['path'], operationModel['type']); // We assume operation exists in api
					action.addOperation(operation);
				});

				entityType.actions.push(action);
			});

			api.entityTypes.push(entityType);
		});
	}

	private generateSecurityDefinitions(api:API, jsonAPI:{}) {
		api['securityDefinitions'] = jsonAPI['securityDefinitions'];
	}

}
