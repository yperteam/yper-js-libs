import { BehaviorSubject, Observable } from "rxjs";
export declare class ObservableStorage<T> {
    subject: BehaviorSubject<T>;
    constructor(defaultValue: T);
    get(): Observable<T>;
    set(item: T): void;
}
