import {Component} from '@angular/core';
import {JsonFormsAdapter} from '../../adapters/jsonforms.adapter';
import {PanelMenu} from 'primeng/primeng';


@Component({
    selector: 'sidebar',
    moduleId: module.id,
    templateUrl: 'sidebar.html',
    directives: [JsonFormsAdapter, PanelMenu],
    styleUrls: ['sidebar.css']
})
export class SidebarComponent {}