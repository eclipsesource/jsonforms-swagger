import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class HeaderService {
  private _devMode: boolean = false;
  private _devModeSubject: BehaviorSubject<boolean> = new BehaviorSubject(this._devMode);
  devMode: Observable<boolean> = this._devModeSubject.asObservable();

  setDevMode(state: boolean){
    this._devMode = state;
    this._devModeSubject.next(this._devMode);
  }
}
