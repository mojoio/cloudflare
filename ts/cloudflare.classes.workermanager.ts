import * as plugins from './cloudflare.plugins';
import { CloudflareAccount } from './cloudflare.classes.account';
import { CloudflareWorker } from './cloudflare.classes.worker';

export class WorkerManager {
  public cfAccount: CloudflareAccount;

  constructor(cfAccountArg: CloudflareAccount) {
    this.cfAccount = cfAccountArg;
  }

  public async createWorker(workerName: string, workerScript: string): Promise<CloudflareWorker> {
    const accountIdentifier = await this.cfAccount.getAccountIdentifier();
    const route = `/accounts/${accountIdentifier}/workers/scripts/${workerName}`;
    const responseBody = await this.cfAccount.request('PUT', route, workerScript, {
      'Content-Type': 'application/javascript',
      'Content-Length': Buffer.byteLength(workerScript)
    });
    return CloudflareWorker.fromApiObject(this, responseBody.result);
  }

  /**
   * lists workers
   */
  public async listWorkers() {
    const accountIdentifier = await this.cfAccount.getAccountIdentifier();
    const route = `/accounts/${accountIdentifier}/workers/scripts`;
    const response = await this.cfAccount.request('GET', route);
    const results = response.result;
    const workers: CloudflareWorker[] = [];
    for (const apiObject of results) {
      workers.push(await CloudflareWorker.fromApiObject(this, apiObject));
    }
    return workers;
  }
}
