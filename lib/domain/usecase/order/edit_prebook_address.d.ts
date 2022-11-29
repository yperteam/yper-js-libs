import { MissionClient, MissionAddress } from "../../../data/entity/mission.entity";
export declare class EditPrebookAddress {
    /** Repository */
    private orderRepository;
    /** UseCase */
    private getCurrentProId;
    call({ prebookId, sender, receiver, receiverAddress, senderAddress, }: {
        prebookId: string;
        sender: MissionClient;
        receiver: MissionClient;
        receiverAddress: MissionAddress;
        senderAddress?: MissionAddress;
    }): Promise<any>;
}
