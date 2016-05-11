import {Component} from '@angular/core';
import {Checkbox} from 'primeng/primeng';
import {HeaderService} from "./header.service";

@Component({
		selector: 'header',
		moduleId: module.id,
		templateUrl: 'header.html',
		styleUrls: ['header.css'],
		directives: [Checkbox]
})
export class HeaderComponent{
  devMode: boolean;
  constructor(private headerService: HeaderService){
  }

  changeDev(event:boolean){
    this.headerService.setDevMode(event);
  }
}
