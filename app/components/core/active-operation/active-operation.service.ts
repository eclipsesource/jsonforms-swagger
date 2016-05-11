import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { ISubject } from '../../../helpers/observer/subject.interface';
import { IObserver } from '../../../helpers/observer/observer.interface';

import { Operation } from '../model/operation';

@Injectable()
export class ActiveOperationService implements ISubject {

  observers: IObserver[] = [];

  activeOperation: Operation;
  initialData: {};

  response: Response;

  attach(observer: IObserver) {
    this.observers.push(observer);
  }

  detach(observer: IObserver) {
    let index = this.observers.indexOf(observer);
    if (index >= 0) {
      this.observers.splice(index, 1);
    }
  }

  notify(notification: string) {
    for (let i = 0; i < this.observers.length; i++) {
      this.observers[i].update(notification);
    }
  }

  setActiveOperation(op: Operation, data: {}) {
    this.activeOperation = op;
    this.initialData = data;
    this.notify('new active operation');
  }

  getActiveOperation(): Operation {
    return this.activeOperation;
  }

  getInitialData(): {} {
    return this.initialData;
  }

  responseReady(res: Response) {
    this.response = res;
    this.notify('response ready');
  }

  getResponse(): Response {
    return this.response;
  }

}
