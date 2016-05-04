import {Component} from '@angular/core';
import {JsonFormsAdapter} from '../../adapters/jsonforms.adapter';
import {Button} from 'primeng/primeng';


@Component({
    selector: 'sidebar',
    template: '<button pButton type="button" label="click"></button><jsonforms class="jsf" [schema]="schema" [uischema]="uischema" [data]="data"></jsonforms>',
    directives: [JsonFormsAdapter, Button]
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