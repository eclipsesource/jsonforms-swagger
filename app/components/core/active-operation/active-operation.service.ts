import { Injectable } from '@angular/core';

import { ISubject } from '../../../helpers/observer/subject.interface';
import { IObserver } from '../../../helpers/observer/observer.interface';

import { Operation } from '../model/operation';

@Injectable()
export class ActiveOperationService implements ISubject {

  observers: IObserver[] = [];

  activeOperation: Operation;

  attach(observer: IObserver) {
    this.observers.push(observer);
  }

  detach(observer: IObserver) {
    let index = this.observers.indexOf(observer);
    if (index >= 0) {
      this.observers.splice(index, 1);
    }
  }

  notify() {
    for (let i = 0; i < this.observers.length; i++) {
      this.observers[i].update();
    }
  }

  getActiveOperation(): Operation {
    return this.activeOperation;
  }

  setActiveOperation(op: Operation) {
    this.activeOperation = op;
    this.notify();
  }

}
