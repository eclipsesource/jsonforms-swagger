import {Component} from '@angular/core';
import {JsonFormsAdapter} from '../../adapters/jsonforms.adapter';

@Component({
    selector: 'sidebar',
    template: '<jsonforms class="jsf" [schema]="schema" [uischema]="uischema" [data]="data"></jsonforms>',
    directives: [JsonFormsAdapter]
})
export class SidebarComponent {
    schema = {
        "type": "object",
        "properties": {
            "firstName": {
                "type": "string"
            },
            "lastName": {
                "type": "string"
            }
        }
    };

    uischema = {
        "type": "HorizontalLayout",
        "elements": [
            {
                "label": "Name",
                "type": "Control",
                "scope": {
                    "$ref": "#/properties/firstName"
                }
            },
            {
                "type": "Control",
                "scope": {
                    "$ref": "#/properties/lastName"
                }
            }
        ]
    };

    data = {
        "firstName": "Johny"
    };
}