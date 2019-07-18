import { WorkerManager } from './cloudflare.classes.workermanager';

export class Worker {
  // STATIC
  public static async fromApiObject(workerManager: WorkerManager, apiObject): Promise<Worker> {
    console.log(apiObject);
    return new Worker(workerManager);
  }
  
  // INSTANCE
  private workerManager: WorkerManager;
  
  public id: string;
  public etag: string;
  public createdOn: string;
  public modifiedOn: string;

  public routes: string[] = [];
  constructor(workerManagerArg: WorkerManager) {
    this.workerManager = workerManagerArg;
  }

  /**
   * gets all routes for a worker
   */
  public async getRoutes(){
    const zones = await this.workerManager.cfAccount.listZones();
    console.log(zones);
  }
  
  public setRoutes(routeArray: string[]) {

  }
}
