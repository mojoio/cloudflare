import * as plugins from './cloudflare.plugins';
import { CloudflareAccount } from './cloudflare.classes.account';

export class ZoneManager {
  public cfAccount: CloudflareAccount;
  public zoneName: string;

  constructor(cfAccountArg: CloudflareAccount) {
    this.cfAccount = cfAccountArg;
  }

  public getZones() {}
}
