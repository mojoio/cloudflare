import * as plugins from './cloudflare.plugins';
import * as interfaces from './interfaces';
import { WorkerManager } from './cloudflare.classes.workermanager';

export interface IWorkerRoute extends interfaces.ICflareWorkerRoute {
  zoneName: string;
}

export class Worker {
  // STATIC
  public static async fromApiObject(workerManager: WorkerManager, apiObject): Promise<Worker> {
    const newWorker = new Worker(workerManager);
    Object.assign(newWorker, apiObject.result);
    await newWorker.getRoutes();
    return newWorker;
  }

  // INSTANCE
  private workerManager: WorkerManager;
  
  public script: string;
  public id: string;
  public etag: string;
  // tslint:disable-next-line: variable-name
  public created_on: string;
  // tslint:disable-next-line: variable-name
  public modified_on: string;

  public routes: IWorkerRoute[] = [];
  constructor(workerManagerArg: WorkerManager) {
    this.workerManager = workerManagerArg;
  }

  /**
   * gets all routes for a worker
   */
  public async getRoutes() {
    const zones = await this.workerManager.cfAccount.listZones();
    for (const zone of zones) {
      const requestRoute = `/zones/${zone.id}/workers/routes`;
      const response: {result: interfaces.ICflareWorkerRoute[]} = await this.workerManager.cfAccount.request('GET', requestRoute);
      for (const route of response.result) {
        console.log('hey');
        console.log(route);
        console.log(this.id);
        if (route.script === this.id) {
          this.routes.push({...route, zoneName: zone.name});
        }
      }
    }
  }

  public async setRoutes(routeArray: Array<{zoneName: string, pattern: string}>) {
    for (const newRoute of routeArray) {
      // lets determine wether a route is new, needs an update or already up to date.
      let routeStatus: 'new' | 'needsUpdate' | 'alreadyUpToDate' = 'new';
      let routeIdForUpdate: string;
      for (const existingRoute of this.routes) {
        if (existingRoute.pattern === newRoute.pattern) {
          routeStatus = 'needsUpdate';
          routeIdForUpdate = existingRoute.id;
          if (existingRoute.script === this.id) {
            routeStatus = 'alreadyUpToDate';
            plugins.smartlog.defaultLogger.log('info', `route already exists, no update needed`);
          }
        }
      }

      // lets care about actually setting routes
      if (routeStatus === 'new') {
        const zoneId = await this.workerManager.cfAccount.getZoneId(newRoute.zoneName);
        const requestRoute = `/zones/${zoneId}/workers/routes`;
        await this.workerManager.cfAccount.request('POST', requestRoute, {
          pattern: newRoute.pattern,
          script: this.id
        });
      } else if (routeStatus === 'needsUpdate') {
        const zoneId = await this.workerManager.cfAccount.getZoneId(newRoute.zoneName);
        const requestRoute = `/zones/${zoneId}/workers/routes/${routeIdForUpdate}`;
        await this.workerManager.cfAccount.request('PUT', requestRoute, {
          pattern: newRoute.pattern,
          script: this.id
        });
      }
    }
  }
}
