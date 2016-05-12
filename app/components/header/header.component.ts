import { Component, ElementRef, Renderer } from '@angular/core';

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
  errorMessage: any;
  constructor(private headerService: HeaderService, private element: ElementRef, private renderer:Renderer) {
    headerService.errorMessage.subscribe((message)=>{
      this.errorMessage = message;
      this.errorMessageIn();
      setTimeout(()=>{
        this.errorMessageOut();
      }, 2000);
    });
  }

  errorMessageIn(){
    $(this.element.nativeElement).find('.label-error-message').css('opacity', '100');
  }
  errorMessageOut(){
    $(this.element.nativeElement).find('.label-error-message').css('opacity', '0');
  }
}
