import { ClientDetails } from "../../../data/provider/http/api";
export declare class AddProIban {
    private repository;
    private getCurrentProId;
    call(): Promise<ClientDetails>;
}
