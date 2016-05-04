import {Component} from '@angular/core';
import {SidebarComponent} from './components/sidebar/sidebar.component';

@Component({
    selector: 'app',
    template: '<div><sidebar></sidebar></div>',
    directives: [SidebarComponent]
})
export class AppComponent{}

