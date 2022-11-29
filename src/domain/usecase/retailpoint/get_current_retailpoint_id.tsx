import { RetailpointRepository } from "../../../data/repository/retailpoint.repository";
import CallableInstance from "callable-instance";
import { from, Observable } from "rxjs";

export class GetCurrentRetailpointId extends CallableInstance<
  [],
  Observable<string>
> {
  private retailpointRepository: RetailpointRepository = new RetailpointRepository();

  constructor() {
    super("instanceMethod");
  }

  public instanceMethod(): Observable<string> {
    return from(this.retailpointRepository.getCurrentRetailpointId());
  }
}
