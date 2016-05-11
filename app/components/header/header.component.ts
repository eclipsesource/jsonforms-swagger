import {Component} from '@angular/core';
import {Checkbox} from 'primeng/primeng';

@Component({
		selector: 'header',
		moduleId: module.id,
		templateUrl: 'header.html',
		styleUrls: ['header.css'],
		directives: [Checkbox]
})
export class HeaderComponent{

	devMode: boolean = false;

  changeDev($event:any){
    this.devMode = $event;
    console.log($event);
  }
}
