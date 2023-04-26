export declare enum UserSex {
    unknown = "unknown",
    male = "male",
    female = "female"
}
export interface User {
    id: string;
    username: string;
    firstname: string;
    lastname: String;
    nickname?: string | null;
}
