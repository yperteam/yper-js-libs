import { ReturnPolicy, TransportType } from "../../../data/entity/mission.entity";
export declare class EditPrebookDetails {
    /** Repository */
    private orderRepository;
    /** UseCase */
    private getCurrentProId;
    call({ prebookId, startDate, endDate, ceremonyDate, transportType, returnPolicy, orderName, comment, }: {
        prebookId: string;
        startDate: Date;
        endDate: Date;
        ceremonyDate: Date;
        transportType: TransportType;
        returnPolicy: ReturnPolicy;
        orderName: string;
        comment?: string;
    }): Promise<any>;
}
