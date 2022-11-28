import CallableInstance from "callable-instance";
import { AuthRepository } from "@yper-script/react/data/repository/auth.repository";

export class PasswordLogin extends CallableInstance<
  [string, string],
  Promise<string>
> {
  private repository = new AuthRepository();

  constructor() {
    super("instanceMethod");
  }

  public instanceMethod(username: string, password: string): Promise<string> {
    return this.repository.passwordLogin({
      username: username,
      password: password,
    });
  }
}
