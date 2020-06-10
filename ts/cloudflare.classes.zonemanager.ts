import * as plugins from './cloudflare.plugins';
import * as interfaces from './interfaces';
import { CloudflareAccount } from './cloudflare.classes.account';
import { CloudflareZone } from './cloudflare.classes.zone';

export class ZoneManager {
  public cfAccount: CloudflareAccount;
  public zoneName: string;

  constructor(cfAccountArg: CloudflareAccount) {
    this.cfAccount = cfAccountArg;
  }

  public async getZones(zoneName: string) {
    let requestRoute = `/zones?per_page=50`;
    // may be optionally filtered by domain name

    if (zoneName) {
      requestRoute = `${requestRoute}&name=${zoneName}`;
    }

    const response: any = await this.cfAccount.request('GET', requestRoute);
    const apiObjects: interfaces.ICflareZone[] = response.result;

    const cloudflareZoneArray = [];
    for (const apiObject of apiObjects) {
      cloudflareZoneArray.push(CloudflareZone.createFromApiObject(apiObject));
    }

    return cloudflareZoneArray;
  }
}
