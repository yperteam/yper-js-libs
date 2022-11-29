export declare class EditPrebookContent {
    /** Repository */
    private orderRepository;
    /** UseCase */
    private getCurrentProId;
    call({ prebookId, options, product, price, itemsNb, }: {
        prebookId: string;
        options: string[];
        product: string;
        price: number;
        itemsNb: number;
    }): Promise<any>;
}
