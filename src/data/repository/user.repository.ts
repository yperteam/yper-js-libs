import { Observable } from "rxjs";
import { CurrentUserStorage } from "@yper-script/react/data/provider/local/current_user_storage";
import { UserSex } from "../entity/user.entity";
import { Api } from "../provider/http/api";

export class UserRepository {
  private api = new Api();

  public getCurrentUserId(): Observable<string> {
    return CurrentUserStorage.instance.get();
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
