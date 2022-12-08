export enum UserSex {
  unknown = "unknown",
  male = "male",
  female = "female",
}

export interface User {
  // TODO ?@JsonKey(name: '_id') 
  id: string,
  username: string,
  firstname: string,
  lastname: String,
  nickname?: string | null,
  //gender: UserSex,
  //birthdate: Date,
  /*@Default([]) List < UserEmail > emails,
  @Default([]) List < UserPhone > phones,
    String ? sponsorCode,
    String ? avatar,*/
}