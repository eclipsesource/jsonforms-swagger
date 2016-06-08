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
  activeIndex: number;
  private _response: BehaviorSubject<Response> = new BehaviorSubject(null);
  response: Observable<Response> = this._response.asObservable();

  private currentOperations: Operation[] = [];

  private setActiveOperation(op: Operation, data: {}) {
    this.initialData = data;
    this._activeOperation.next(op);
  }

  getInitialData(){
    return this.initialData;
  }

  setResponse(res: Response) {
    this._response.next(res);
  }

  setOperations(operations: Operation[]){
    this.currentOperations = operations;
    this.setActiveOperationByIndex(0);
  }
  setOperation(operation: Operation){
    this.currentOperations = [operation];
    this.setActiveOperationByIndex(0);
  }

  getCurrentOperations(): Operation[]{
    return this.currentOperations;
  }

  setActiveOperationByIndex(index: number){
    this.activeIndex = index;
    if(index>=this.currentOperations.length){
      return;
    }
    this.setActiveOperation(this.currentOperations[index], {});
  }
}
