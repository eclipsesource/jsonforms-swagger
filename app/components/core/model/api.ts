import { Tag } from './tag';

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

}
