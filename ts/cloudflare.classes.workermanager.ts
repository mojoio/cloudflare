import * as plugins from './cloudflare.plugins';
import { CloudflareAccount } from './cloudflare.classes.account';
import { Worker } from './cloudflare.classes.worker';

export class WorkerManager {
  public cfAccount: CloudflareAccount;

  constructor(cfAccountArg: CloudflareAccount) {
    this.cfAccount = cfAccountArg;
  }

  public async createWorker(workerName: string, workerScript: string): Promise<Worker> {
    const accountIdentifier = await this.cfAccount.getAccountIdentifier();
    const route = `/accounts/${accountIdentifier}/workers/scripts/${workerName}`;
    const responseBody = await this.cfAccount.request('PUT', route, workerScript, {
      'Content-Type': 'application/javascript',
      'Content-Length': Buffer.byteLength(workerScript)
    });
    return Worker.fromApiObject(this, responseBody);
  }

  /**
   * lists workers
   */
  public async listWorkers() {
    const accountIdentifier = await this.cfAccount.getAccountIdentifier();
    const route = `/accounts/${accountIdentifier}/workers/scripts`;
    const response = await this.cfAccount.request('GET', route);
    console.log(response);
  }
}
