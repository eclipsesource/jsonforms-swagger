import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ErrorService {

	private _errorMessage = new Subject<string>();
	errorMessage = this._errorMessage.asObservable();

	showErrorMessage(msg: string) {
		this._errorMessage.next(msg);
	}

}