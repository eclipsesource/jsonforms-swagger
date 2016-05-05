import {Component} from '@angular/core';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';

@Component({
    selector: 'app',
    moduleId: module.id,
    templateUrl: 'app.html',
    styleUrls: ['app.css'],
    directives: [SidebarComponent, HeaderComponent]
})
export class AppComponent{}

