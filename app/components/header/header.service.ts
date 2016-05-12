import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HeaderService {

  private errorMessage: any = null;

  private _devModeSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  devMode: Observable<boolean> = this._devModeSubject.asObservable();

  private _urlInputSubject: Subject<string> = new Subject();
  urlInput: Observable<string> = this._urlInputSubject.asObservable();

  setDevMode(state: boolean) {
    this._devModeSubject.next(state);
  }

  setErrorMessage(message: any){
    this.errorMessage = message;
  }
  getErrorMessage(): any {
    return this.errorMessage;
  }

  resolveAPIUrl(url: string){
    this._urlInputSubject.next(url);
  }
}
