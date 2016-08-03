import { Component } from '@angular/core';

import { Messages, Message } from 'primeng/primeng';

import { ErrorService } from './error.service';

@Component({
	selector: 'error',
	template: require('./error.html'),
	directives: [Messages]
})
export class ErrorComponent {

	messages: Message[] = [];

	constructor(private errorService: ErrorService) {
		errorService.errorMessage.subscribe((errorMessage) => {
			this.messages.push({ severity: 'error', summary: 'Error', detail: errorMessage });
			setTimeout(() => {
				this.messages.shift(); // take out last inserted message
			}, 3000);
		});
	}

}