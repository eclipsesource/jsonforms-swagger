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

  getSchema(): {} {
    return this.properties['schema'];
  }

}
