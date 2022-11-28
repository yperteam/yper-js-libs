import { RecoilLoadable, Loadable } from "recoil";

export class CustomLoadable {
  static loading<T>(): Loadable<T> {
    return RecoilLoadable.loading();
  }

  static async guard<T>(f: () => Promise<T>): Promise<Loadable<T>> {
    try {
      const res = await f();
      return RecoilLoadable.of(res);
    } catch (e) {
      return RecoilLoadable.error(e);
    }
  }
}
