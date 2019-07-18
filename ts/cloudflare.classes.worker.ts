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
  
  public setRoutes(routeArray: string[]) {

  }
}
