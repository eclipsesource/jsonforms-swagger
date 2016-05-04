import {Component} from '@angular/core';
import {SidebarComponent} from './components/sidebar/sidebar.component';

@Component({
    selector: 'app',
    template: '<h1>Testing angular 2</h1><sidebar></sidebar>',
    directives: [SidebarComponent]
})
export class AppComponent{}

