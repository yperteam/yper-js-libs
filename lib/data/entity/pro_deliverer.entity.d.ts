export interface ProDeliverer {
    data: {
        id: string;
        avatar: string;
        firstname: string;
        lastname: string;
        nickname: string;
        username: string;
    };
    type: string;
}
export interface ProFavoriteDeliverer {
    id: string;
    createdAt: Date;
    recipient: {
        shopper: string;
    };
    sender: {
        pro: string;
    };
    retailpoint: string;
}
export interface ProBlockedDeliverer {
    count: {
        current: number;
        total: number;
    };
    data: BlockedDeliverer[];
}
export interface BlockedDeliverer {
    id: string;
    about: {
        id: string;
        type: string;
    };
    author: {
        id: string;
        type: string;
    };
    comment?: string;
    createdAt: Date;
    start_at: Date;
    end_at?: Date;
    reason: string;
    recipient: {
        id: string;
        type: string;
    };
}
