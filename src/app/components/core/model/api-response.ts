export class APIResponse {

  properties: {} = {};

  getCode(): number {
    return this.properties['code'];
  }

  getDescription(): string {
    return this.properties['description'];
  }

  hasSchema(): boolean {
    return this.properties['schema'] != undefined;
  }

  isArray(): boolean {
    return this.properties['schema']['type'] == 'array';
  }

  getSchema(): {} {
    return this.properties['schema'];
  }

}
