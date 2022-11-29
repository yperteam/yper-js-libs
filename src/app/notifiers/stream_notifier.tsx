import {
  atom,
  atomFamily,
  Loadable,
  RecoilLoadable,
  SerializableParam,
} from "recoil";
import { concat, Observable, of, switchMap } from "rxjs";
import { CustomLoadable } from "./custom_loadable";

export class StreamNotifier {
  static provider<T>(props: {
    key: string;
    stream: Observable<T>;
    interval?: Observable<any>;
  }) {
    return atom<Loadable<T>>({
      key: props.key,
      default: CustomLoadable.loading<T>(),
      effects_UNSTABLE: [
        ({ setSelf }) => {
          const baseStream = props.interval
            ? concat(of(1), props.interval)
            : of(1);
          const subscription = baseStream
            .pipe(switchMap(() => props.stream))
            .subscribe({
              next: m => setSelf(RecoilLoadable.of(m)),
              error: e => setSelf(RecoilLoadable.error(e)),
            });
          return () => {
            subscription.unsubscribe();
          };
        },
      ],
    });
  }

  static providerFamily<T, P extends SerializableParam>(props: {
    key: string;
    stream: (param: P) => Observable<T>;
    interval?: Observable<any>;
  }) {
    return atomFamily<Loadable<T>, P>({
      key: props.key,
      default: CustomLoadable.loading<T>(),
      effects_UNSTABLE: [
        ({ node, setSelf }) => {
          // we recover the family param
          const baseStream = props.interval
            ? concat(of(1), props.interval)
            : of(1);
          const familyKey = node.key.replace(props.key + '__"', "");
          const subscription = baseStream
            .pipe(
              switchMap(() =>
                props.stream(familyKey.substring(0, familyKey.length - 1) as P)
              )
            )
            .subscribe({
              next: m => setSelf(RecoilLoadable.of(m)),
              error: e => setSelf(RecoilLoadable.error(e)),
            });
          return () => {
            subscription.unsubscribe();
          };
        },
      ],
    });
  }
}
