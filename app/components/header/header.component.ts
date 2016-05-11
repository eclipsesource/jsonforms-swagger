import {Component} from '@angular/core';
import {Checkbox} from "../../uikit/Checkbox";

@Component({
		selector: 'header',
		moduleId: module.id,
		templateUrl: 'header.html',
		styleUrls: ['header.css'],
		directives: [Checkbox]
})
export class HeaderComponent{

	devMode: boolean = false;

  changeDev($event){
    this.devMode = $event;
  }
}
