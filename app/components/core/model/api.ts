import { Tag } from './tag';
import { Operation } from './operation';

export class API {

  properties: {} = {};
  tags: Tag[] = [];

  getBaseUrl(): string {
    return 'http://' +  this.properties['host'] + this.properties['basePath'];
  }

  getTagByName(name: string): Tag {
    return _.find(this.tags, function(tag) {
      return tag.properties['name'] == name;
    });
  }

  getOperationById(id: string): Operation {
    let operation: Operation;

    _.forEach(this.tags, (tag: Tag) => {
      operation = tag.getOperationById(id);
      if (operation) {
        return false;
      }
    });

    return operation;
  }

}
