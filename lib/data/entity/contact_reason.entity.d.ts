export declare enum MeanType {
    phone = "phone",
    chat = "chat",
    email = "email",
    unknown = ""
}
interface Scheduling {
    day: number;
    hours: {
        start: Date;
        end: Date;
    };
}
export interface MeanOfContact {
    scheduling?: Scheduling;
    settings: {
        email: string;
    };
    type: MeanType;
}
export interface FaqArticle {
    title: string;
    url: string;
}
export interface ContactReasonBase {
    id: string;
    categoryLabel: string;
    categoryName: string;
    label: string;
    name: string;
}
export interface ContactReasonEntity extends ContactReasonBase {
    faq: {
        customer?: FaqArticle[];
        pro?: FaqArticle[];
        shopper?: FaqArticle[];
    };
    meansOfContact: {
        customer?: MeanOfContact[];
        pro?: MeanOfContact[];
        shopper?: MeanOfContact[];
    };
}
export {};
