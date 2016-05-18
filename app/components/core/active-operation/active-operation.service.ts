import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Operation } from '../model/operation';

import {BehaviorSubject} from "../../../../node_modules/rxjs/BehaviorSubject";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ActiveOperationService {

  private _activeOperation: BehaviorSubject<Operation> = new BehaviorSubject(null);
  activeOperation: Observable<Operation> = this._activeOperation.asObservable();

  initialData: {} = {};

  private _response: BehaviorSubject<Response> = new BehaviorSubject(null);
  response: Observable<Response> = this._response.asObservable();

  setActiveOperation(op: Operation, data: {}) {
    this.initialData = data;
    this._activeOperation.next(op);
  }

  getInitialData(){
    return this.initialData;
  }

  setResponse(res: Response) {
    this._response.next(res);
  }
}
