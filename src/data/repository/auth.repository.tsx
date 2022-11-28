import { AuthStorage } from "@yper-script/react/data/provider/local/auth_storage";
import { Observable } from "rxjs";
import { Api } from "../provider/http/api";

export class AuthRepository {
  private api = new Api();
  private authStorage = AuthStorage.instance;

  public getToken(): Observable<string> {
    return this.authStorage.get();
  }

  public async passwordLogin(props: {
    username: string;
    password: string;
  }): Promise<string> {
    return this.api.login({
      grantType: "password",
      appId: process.env.YPER_YPERAPI_CLIENT_ID,
      appSecret: process.env.YPER_YPERAPI_CLIENT_SECRET,
      username: props.username,
      password: props.password,
    });
  }
}
