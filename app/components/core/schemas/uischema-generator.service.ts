import { Injectable } from '@angular/core';

@Injectable()
export class UischemaGeneratorService {

  generateUischema(dataschema: {}): {} {
    let uischema: {} = {
      'type': 'VerticalLayout',
      'elements': []
    };

    _.forEach(dataschema['properties'], (property: any, name: string) => {
      this.addProperty(uischema['elements'], property, name, '#/properties/');
    });

    return uischema;
  }

  addProperty(layoutElements: {}[], property: {}, name: string, path: string) {
    if (property['type'] == 'object') {
      let sublayout: {} = {
        'type': 'Group',
        'label': name,
        'elements': []
      };
      _.forEach(property['properties'], (subproperty: any, subname: string) => {
        this.addProperty(sublayout['elements'], subproperty, subname, path + name + '/properties/');
      });
      layoutElements.push(sublayout);
    } else {
      let control = {
        'type': 'Control',
        'label': name,
        'scope': {
          '$ref': path + name
        }
      };
      layoutElements.push(control);
    }
  }

}
