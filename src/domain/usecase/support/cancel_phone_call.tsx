import CallableInstance from "callable-instance";
import { SupportRepository } from "../../../data/repository/support.repository";

export class CancelPhoneCall extends CallableInstance<[string], Promise<void>> {
  private repository = new SupportRepository();

  constructor() {
    super("instanceMethod");
  }

  public async instanceMethod(callId: string): Promise<void> {
    return this.repository.cancelPhoneCallRequest(callId);
  }
}
