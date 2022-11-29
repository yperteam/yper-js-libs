import { ProDeliverer } from "../../data/entity/pro_deliverer.entity";
export declare class FormattedProDeliverer {
    readonly id: string;
    readonly avatar?: string;
    readonly firstname?: string;
    readonly lastname?: string;
    readonly nickname?: string;
    readonly username?: string;
    readonly type?: string;
    readonly favoriteId: string;
    readonly favorite?: boolean;
    readonly blocked?: boolean;
    constructor(formattedDeliverer: ProDeliverer);
}
