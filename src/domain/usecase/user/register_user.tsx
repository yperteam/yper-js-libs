import CallableInstance from "callable-instance";
import {
  RegisterUserProps,
  UserRepository,
} from "@yper-script/react/data/repository/user.repository";
import { PasswordLogin } from "../auth/password_login";
import { SignTerm } from "../terms/sign_term";

export class RegisterUser extends CallableInstance<
  [RegisterUserProps],
  Promise<void>
> {
  private repository = new UserRepository();
  private signTerm = new SignTerm();

  constructor() {
    super("instanceMethod");
  }

  public async instanceMethod(props: RegisterUserProps): Promise<void> {
    await this.repository.registerUser(props);
    await new PasswordLogin()(props.email, props.password);
    // TODO send email / phone code ?
    // TODO change based on app context ?
    await this.signTerm("cgu_customer");
    await this.signTerm("gdpr")
  }
}
