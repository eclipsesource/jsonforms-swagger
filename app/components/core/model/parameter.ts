export class Parameter {

	properties:{} = {};

	getName():string {
		return this.properties['name'];
	}

	getIn():string {
		return this.properties['in'];
	}

	getType():string {
		return this.properties['type'];
	}

	getSchema():{} {
		return this.properties['schema'];
	}

	getRequired() {
		return this.properties['required'];
	}

}
