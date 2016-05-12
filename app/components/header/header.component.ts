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
  constructor(private headerService: HeaderService) {}
}
