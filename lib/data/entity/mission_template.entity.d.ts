import { TransportType } from "./mission.entity";
export interface MissionTemplate {
    id: string;
    description: string;
    enabled: boolean;
    frFr?: {
        name: string;
        type: string;
    };
    images: {
        frFr?: string;
    };
    isCeremony: boolean;
    name: string;
    option: Option[];
    parentId?: string;
    transportType: TransportTypeDefault[];
}
export interface Option {
    default: boolean;
    forced: boolean;
    name: string;
}
export interface TransportTypeDefault {
    default: boolean;
    name: TransportType;
}
