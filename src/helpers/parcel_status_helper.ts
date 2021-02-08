import { ParcelStatusEnum } from "../enums/parcel_status_enum";

/**
 * ParcelStatusHelper
 */
export default class ParcelStatusHelper {
    public readonly endCycle = [
        ParcelStatusEnum.created,
        ParcelStatusEnum.hub_customer_handover,
        ParcelStatusEnum.returned_to_provider,
    ];
    public readonly mergeCycle = [
        ParcelStatusEnum.created,
        ParcelStatusEnum.pending_delivery,
        ParcelStatusEnum.ready_for_delivery,
    ];
    public readonly canBeRefusedCycle = [
        ParcelStatusEnum.created,
        ParcelStatusEnum.pending_delivery,
        ParcelStatusEnum.ready_for_delivery,
        ParcelStatusEnum.delivery_failed,
    ];

    public readonly statusToDeliver = "parcel-to-deliver";
    public readonly statusScanned = "parcel-scanned";
    public readonly statusToPrepare = "parcel-to-prepare";
    public readonly statusDelivered = "parcel-delivered";
    public readonly statusReturned = "parcel-returned";
    public readonly statusInPerson = "parcel-in-person";
    public readonly statusRefused = "parcel-refused";

    public readonly tradStatusEnum = {
        [this.statusToDeliver]: [ParcelStatusEnum.pending_provider_return],
        [this.statusScanned]: [ParcelStatusEnum.created],
        [this.statusToPrepare]: [ParcelStatusEnum.pending_delivery],
        [this.statusDelivered]: [
            ParcelStatusEnum.delivered,
            ParcelStatusEnum.hub_customer_handover,
        ],
        [this.statusReturned]: [ParcelStatusEnum.returned_to_provider],
        [this.statusInPerson]: [ParcelStatusEnum.pending_hub_customer_handover],
        [this.statusRefused]: [ParcelStatusEnum.refused],
    };
}
