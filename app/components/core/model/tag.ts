import { Operation } from './operation';

export class Tag {

  properties: {};
  operations: Operation[] = [];

  getName(): string {
    return this.properties['name'];
  }
}
