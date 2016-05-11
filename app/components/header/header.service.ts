import {Injectable} from '@angular/core';

@Injectable()
export class HeaderService {
  private _devMode: boolean = false;

  get devMode():boolean {
    return this._devMode;
  }
  set devMode(newDev:boolean){
    this._devMode = newDev;
  }

}
