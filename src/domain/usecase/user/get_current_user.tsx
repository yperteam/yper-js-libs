import { Observable } from "rxjs";
import CallableInstance from "callable-instance";
import { UserRepository } from "../../../data/repository/user.repository";
import { User } from "../../../data/entity/user.entity";

export class GetCurrentUser extends CallableInstance<[], Observable<User>> {
  private userRepository: UserRepository = new UserRepository();

  constructor() {
    super("instanceMethod");
  }

  public instanceMethod(): Observable<User> {
    return this.userRepository.getCurrentUser();
  }
}
