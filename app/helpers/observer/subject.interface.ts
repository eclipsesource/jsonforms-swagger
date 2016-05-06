import { IObserver } from './observer.interface';

export interface ISubject {

  attach(observer: IObserver): void;
  detach(observer: IObserver): void;
  notify(): void;

}
