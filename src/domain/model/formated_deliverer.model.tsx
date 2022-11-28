import { ProDeliverer } from "@yper-script/react/data/entity/pro_deliverer.entity";

export class FormattedProDeliverer {
  readonly id: string;
  readonly avatar?: string;
  readonly firstname?: string;
  readonly lastname?: string;
  readonly nickname?: string;
  readonly username?: string;
  readonly type?: string;
  readonly favoriteId: string;
  readonly favorite?: boolean;
  readonly blocked?: boolean;
  constructor(formattedDeliverer: ProDeliverer) {
    this.id = formattedDeliverer.data.id;
    this.avatar = formattedDeliverer.data.avatar;
    this.firstname = formattedDeliverer.data.firstname;
    this.lastname = formattedDeliverer.data.lastname;
    this.nickname = formattedDeliverer.data.nickname;
    this.username = formattedDeliverer.data.username;
    this.type = formattedDeliverer.type;
    this.favoriteId = "";
    (this.favorite = false), (this.blocked = false);
  }
}
