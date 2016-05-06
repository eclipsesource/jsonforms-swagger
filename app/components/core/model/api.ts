import * as _ from 'lodash';

import { Tag } from './tag';

export class API {

  properties: {};
  tags: Tag[] = [];

  getTagByName(name: string): Tag {
    return _.find(this.tags, function(tag) {
      return tag.properties['name'] == name;
    });
  }

}
