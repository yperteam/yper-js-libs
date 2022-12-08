import { firstValueFrom, from, Observable, switchMap } from "rxjs";
import { Lock } from "async-await-mutex-lock";
import { CurrentUserStorage } from "../provider/local/current_user_storage";
import { User, UserSex } from "../entity/user.entity";
import { Api } from "../provider/http/api";

export class UserRepository {
  private api = new Api();
  private userLock = new Lock<string>()

  private _getCurrentUser(): Observable<User> {
    return from(this.api.getCurrentUser()).pipe(
      switchMap(user => {
        CurrentUserStorage.instance.set(user);
        this.userLock.release("userLock");
        return CurrentUserStorage.instance.get();
      })
    );
  }

  public getCurrentUser(): Observable<User> {
    return from(this.userLock.acquire("userLock")).pipe(
      switchMap(_ => this._getCurrentUser())
    );
  }

  public watchCurrentUser(): Observable<User> {
    return from(this.userLock.acquire("userLock")).pipe(
      switchMap(_ => firstValueFrom(CurrentUserStorage.instance.get())),
      switchMap(user => {
        if (user != null) {
          this.userLock.release("userLock");
          return CurrentUserStorage.instance.get()
        }
        return this._getCurrentUser();
      }),
    );
  }

  public registerUser(props: RegisterUserProps) {
    return this.api.registerUser(props);
  }
}

export interface RegisterUserProps {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  birthDate: Date;
  password: string;
  sex: UserSex;
}
