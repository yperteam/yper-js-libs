import { Observable } from "rxjs";
import { ProRepository } from "@yper-script/react/data/repository/pro.repository";
import CallableInstance from "callable-instance";

// TODO to be removed when switching to full react
export class GetCurrentProId extends CallableInstance<[], Observable<string>> {
  private proRepository: ProRepository = new ProRepository();

  constructor() {
    super("instanceMethod");
  }

  public instanceMethod(): Observable<string> {
    return this.proRepository.getCurrentProId();
  }
}
