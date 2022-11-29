import { Observable } from "rxjs";
import { UserRepository } from "../../../data/repository/user.repository";
import CallableInstance from "callable-instance";

// TODO to be removed when switching to full react
export class GetCurrentUserId extends CallableInstance<[], Observable<string>> {
  private userRepository: UserRepository = new UserRepository();

  constructor() {
    super("instanceMethod");
  }

  public instanceMethod(): Observable<string> {
    return this.userRepository.getCurrentUserId();
  }
}
