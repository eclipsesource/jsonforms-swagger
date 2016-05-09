import { Injectable } from '@angular/core';

@Injectable()
export class UischemaGeneratorService {

  generateUischema(dataschema: {}): {} {
    let uischema = {
      'type': 'VerticalLayout',
      'elements': []
    };

    _.forEach(dataschema['properties'], (property, name) => {
      this.addProperty(uischema['elements'], property, name, '#/properties/');
    });

    return uischema;
  }

  addProperty(layoutElements: {}[], property: {}, name: string, path: string) {
    if (property['type'] == 'object') {
      _.forEach(property['properties'], (subproperty, subname) => {
        let sublayout = {
          'type': 'HorizontalLayout',
          'elements': []
        };
        layoutElements.push(sublayout);
        this.addProperty(sublayout['elements'], subproperty, subname, path + name + '/properties/');
      })
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
