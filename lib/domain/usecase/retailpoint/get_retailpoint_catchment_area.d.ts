export declare class GetRetailpointCatchmentArea {
    /** Repository */
    private proRepository;
    /** UseCase */
    private getCurrentProId;
    private getCurrentRetailPoint;
    call(begin: Date, end: Date, distanceInterval: number, min: number, max: number): Promise<number[]>;
}
