import {Component} from '@angular/core';
import {JsonFormsAdapter} from '../../adapters/jsonforms.adapter';

console.log(JsonFormsAdapter);
@Component({
    selector: 'sidebar',
    template: '<div><ul><li>Hi</li><li>Ho</li></ul><jsonforms [schema]="schema" [ui-schema]="uiSchema" [data]="data"></jsonforms></div>',
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

    uiSchema = {
        "type": "HorizontalLayout",
        "elements": [
            {
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