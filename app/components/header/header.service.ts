import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HeaderService {

  private _errorMessage: BehaviorSubject<any> = new BehaviorSubject(null);
  errorMessage: Observable<any> = this._errorMessage.asObservable();

  private _devModeSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  devMode: Observable<boolean> = this._devModeSubject.asObservable();

  setDevMode(state: boolean) {
    this._devModeSubject.next(state);
  }

  setErrorMessage(message: any){
    this._errorMessage.next(message);
  }
}
