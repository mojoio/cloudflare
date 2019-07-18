import * as plugins from './cloudflare.plugins';
import { CloudflareAccount } from './cloudflare.classes.account';

export class WorkerManager {
  public cfAccount: CloudflareAccount;

  constructor(cfAccountArg: CloudflareAccount) {
    this.cfAccount = cfAccountArg;
  }
}
