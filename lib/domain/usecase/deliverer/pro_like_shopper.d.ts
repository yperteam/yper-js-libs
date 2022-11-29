export declare class ProLikeShopper {
    /** Repository */
    private proRepository;
    /** UseCase */
    private getCurrentProId;
    private getCurrentRetailPoint;
    call(delivererId: string, delivererType: string): Promise<any>;
}
