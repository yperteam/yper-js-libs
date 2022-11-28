import { PhoneCallRequest } from "../../entity/phone_call_request.entity";
import { ObservableStorage } from "./observable_storage";

export class CallRequestStorage extends ObservableStorage<PhoneCallRequest[]> {
  constructor() {
    super([]);
  }

  static instance = new CallRequestStorage();
}
