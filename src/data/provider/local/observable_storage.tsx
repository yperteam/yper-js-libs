import { BehaviorSubject, Observable } from "rxjs";

export class ObservableStorage<T> {
  public subject: BehaviorSubject<T>;

  constructor(defaultValue: T) {
    this.subject = new BehaviorSubject<T>(defaultValue);
  }

  public get(): Observable<T> {
    return this.subject;
  }

  public set(item: T) {
    this.subject.next(item);
  }
}
