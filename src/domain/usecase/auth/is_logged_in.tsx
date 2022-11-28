import { map, Observable } from "rxjs";
import CallableInstance from "callable-instance";
import { AuthRepository } from "@yper-script/react/data/repository/auth.repository";

export class IsLoggedIn extends CallableInstance<[], Observable<boolean>> {
  private repository: AuthRepository = new AuthRepository();

  constructor() {
    super("instanceMethod");
  }

  public instanceMethod(): Observable<boolean> {
    return this.repository.getToken().pipe(map(t => t != null));
  }
}
