export class Project {

	public apiModel: {} = {};

	constructor(public name: string, public apiUrl: string) {
	}

	setAPIModel(newAPIModel: {}) {
		this.apiModel = newAPIModel;
	}

}