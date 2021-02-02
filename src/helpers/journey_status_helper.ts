import { JourneyStatusEnum } from "@yper-script/enums/journey_status_enum";

export class JourneyStatusHelper {
    public readonly statusAll = "journey-all";
    public readonly statusWaiting = "journey-waiting";
    public readonly statusAssigned = "journey-assigned";
    public readonly statusStarted = "journey-started";
    public readonly statusFinished = "journey-finished";

    public readonly tradStatusEnum = {
        [this.statusAll]: [
            JourneyStatusEnum.canceled,
            JourneyStatusEnum.created,
            JourneyStatusEnum.pending_assignment,
            JourneyStatusEnum.running_journey_resolver,
            JourneyStatusEnum.running,
            JourneyStatusEnum.end,
        ],
        [this.statusWaiting]: [JourneyStatusEnum.pending_assignment],
        [this.statusAssigned]: [JourneyStatusEnum.created],
        [this.statusStarted]: [JourneyStatusEnum.running],
        [this.statusFinished]: [JourneyStatusEnum.end],
    };
}
