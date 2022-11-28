import { firstValueFrom, from, Observable, switchMap } from "rxjs";
import { Api } from "@yper-script/react/data/provider/http/api";
import { ProStorage } from "@yper-script/react/data/provider/local/pro_storage";
import {
  ProRetailpointStats,
  ProStats,
} from "@yper-script/react/data/entity/pro_retailpoint_stats.entity";
import { StatsInterval } from "@yper-script/react/data/entity/stats_interval.enum";
import DatedStatNumber from "@yper-script/react/domain/model/dated_stat_number";
import { ProRetailpointList } from "@yper-script/react/data/entity/retailpoint.entity";
import { PaginatedResult } from "@yper-script/react/data/provider/http/paginated_result";
import { Invoice } from "@yper-script/react/data/entity/invoice.entity";
import { Pro } from "@yper-script/react/data/entity/pro.entity";
import {
  BlockedDeliverer,
  ProDeliverer,
  ProFavoriteDeliverer,
} from "@yper-script/react/data/entity/pro_deliverer.entity";
import { BlockedDelivererStorage } from "@yper-script/react/data/provider/local/blocked_deliverer_storage";
import { FavoriteDelivererStorage } from "@yper-script/react/data/provider/local/favorite_deliverer_storage";
import { MissionTemplate } from "@yper-script/react/data/entity/mission_template.entity";

export class ProRepository {
  private api = new Api();

  private proStorage = ProStorage.instance;

  public getCurrentProId(): Observable<string> {
    return this.proStorage.get();
  }

  public async getPro(id: string): Promise<Pro> {
    return this.api.getPro(id);
  }

  public async getRetailPointStats(
    proId: string,
    rpId: string,
    begin: Date,
    end: Date
  ): Promise<ProRetailpointStats> {
    return this.api.getProRetailpointStats(proId, rpId, begin, end);
  }

  public async getProStats(
    proId: string,
    begin: Date,
    end: Date,
    retailpointsIds: string[]
  ): Promise<ProRetailpointStats> {
    return this.api.getProStats(proId, begin, end, retailpointsIds);
  }

  public async getRetailPointCatchmentsArea(
    proId: string,
    rpId: string,
    begin: Date,
    end: Date,
    distanceInterval: number,
    min: number,
    max: number
  ): Promise<number[]> {
    return this.api.getRetailointCatchmentsArea(
      proId,
      rpId,
      begin,
      end,
      distanceInterval,
      min,
      max
    );
  }

  public async getRetailPointDeliveryDistribution(
    proId: string,
    rpId: string,
    begin: Date,
    end: Date,
    interval: StatsInterval
  ): Promise<DatedStatNumber[]> {
    return this.api.getRetailointDeliveryDistribution(
      proId,
      rpId,
      begin,
      end,
      interval
    );
  }

  public async getRetailPointCartPrice(
    proId: string,
    rpId: string,
    begin: Date,
    end: Date,
    interval: StatsInterval
  ): Promise<DatedStatNumber[]> {
    return this.api.getRetailointCartPrice(proId, rpId, begin, end, interval);
  }

  // TODO provide a way to refresh this
  public async getProRetailpoints(proId: string): Promise<ProRetailpointList> {
    const rps = await this.api.getProRetailPoints(proId);
    // TODO storage
    return rps;
  }

  public async getProRetailpoinsStats(
    proId: string,
    retailpointsIds: string[],
    begin: Date,
    end: Date
  ): Promise<ProStats[]> {
    return this.api.getProRetailsPointsStats(
      proId,
      retailpointsIds,
      begin,
      end
    );
  }

  public async getInvoices(
    proId: string,
    startDate: Date,
    endDate: Date
  ): Promise<PaginatedResult<Invoice>> {
    return this.api.getProInvoice(proId, -1, startDate, endDate);
  }

  public async getProLimit(proId: string): Promise<ProLimit> {
    return this.api.getProLimit(proId);
  }

  // TODO make it observable
  public async getDeliverer(
    id: string,
    filter: string
  ): Promise<ProDeliverer[]> {
    return this.api.getDeliverer(id, filter);
  }

  public getFavoriteDeliverers(
    proId: string,
    rpId: string
  ): Observable<ProFavoriteDeliverer[]> {
    return from(this.api.getFavoriteDeliverers(proId, rpId)).pipe(
      switchMap(deliverers => {
        FavoriteDelivererStorage.instance.set(deliverers);
        return FavoriteDelivererStorage.instance.get();
      })
    );
  }

  /*{
  "5": {
    "_id": "6253f9851c2c1c3f0878bae9",
    "createdAt": "2022-04-11T09:48:53.051000+00:00",
    "recipient": {
      "shopper": "5ef21863754dfc37bc0674a9"
    },
    "sender": {
      "pro": "48259867A7109",
      "retailpoint": "59pe159JSK11848fe9ced73b"
    }
  }
}*/

  /* BLOCKED
  {
    "0": {
      "_id": "61f0045e947a4ed9d6470143",
      "about": {
        "id": "48259867A7109",
        "type": "pro"
      },
      "author": {
        "id": "6076f1e3393f5335a7029d38",
        "type": "user"
      },
      "comment": null,
      "createdAt": "2022-01-25T14:08:30.349000+00:00",
      "end_at": null,
      "reason": "other",
      "recipient": {
        "id": "p8wx5Bv2tctHwKsTt",
        "type": "shopper"
      },
      "start_at": "2022-01-25T14:08:30.348000+00:00"
    }
  }*/

  public getBlockedDeliverers(proId: string): Observable<BlockedDeliverer[]> {
    return from(this.api.getBlockedDeliverers(proId)).pipe(
      switchMap(deliverers => {
        BlockedDelivererStorage.instance.set(deliverers.data);
        return BlockedDelivererStorage.instance.get();
      })
    );
  }

  public async deprecateShopper(
    proId: string,
    delivererId: string
  ): Promise<BlockedDeliverer> {
    const blocked = await this.api.deprecateShopper(proId, delivererId);
    const list = await firstValueFrom(BlockedDelivererStorage.instance.get());
    BlockedDelivererStorage.instance.set([...list, blocked]);
    return blocked;
  }

  public async dislikeShopper(
    proId: string,
    retailPointId: string,
    likeId: string
  ): Promise<void> {
    await this.api.dislikeShopper(proId, retailPointId, likeId);
    const list = Array.from(
      await firstValueFrom(FavoriteDelivererStorage.instance.get())
    );
    FavoriteDelivererStorage.instance.set(list.filter(l => l.id != likeId));
  }

  public async likeShopper(
    proId: string,
    retailPointId: string,
    delivererId: string,
    delivererType: string
  ): Promise<ProFavoriteDeliverer> {
    const like = await this.api.likeShopper(
      proId,
      retailPointId,
      delivererId,
      delivererType
    );
    const list = await firstValueFrom(FavoriteDelivererStorage.instance.get());
    FavoriteDelivererStorage.instance.set([...list, like]);
    return like;
  }

  public async getMissionTemplates(proId): Promise<MissionTemplate[]> {
    return this.api.getProMissionTemplates(proId);
  }

  public async resetSecret(proId: string) {
    return this.api.resetProSecret(proId);
  }
}
