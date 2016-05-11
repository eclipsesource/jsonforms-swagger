import { Component } from '@angular/core';

import { HeaderService } from './header.service';

import { Checkbox } from 'primeng/primeng';

@Component({
		selector: 'header',
		moduleId: module.id,
		templateUrl: 'header.html',
		styleUrls: ['header.css'],
		directives: [Checkbox]
})
export class HeaderComponent{
  devMode: boolean;

  constructor(private headerService: HeaderService) {}

  onChangeDevMode(state: boolean) {
    this.headerService.setDevMode(state);
  }
}
