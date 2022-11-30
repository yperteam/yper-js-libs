export declare class GetMissionTemplates {
    /** Repository */
    private proRepository;
    private retailpointRepository;
    /** UseCase */
    private getCurrentProId;
    private getCurrentRetailPoint;
    call(): Promise<import("../../..").MissionTemplate[]>;
}
