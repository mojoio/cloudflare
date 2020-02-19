import plugins = require('./cloudflare.plugins');
import * as interfaces from './interfaces';

// interfaces
import { WorkerManager } from './cloudflare.classes.workermanager';
import { ZoneManager } from './cloudflare.classes.zonemanager';

export class CloudflareAccount {
  private authEmail: string;
  private authKey: string;
  private accountIdentifier: string;

  public workerManager = new WorkerManager(this);
  public zoneManager = new ZoneManager(this);

  /**
   * constructor sets auth information on the CloudflareAccountInstance
   * @param optionsArg
   */
  constructor(optionsArg: { email: string; key: string }) {
    this.authEmail = optionsArg.email;
    this.authKey = optionsArg.key;
  }

  /**
   * gets you the account identifier
   */
  public async getAccountIdentifier() {
    if (!this.accountIdentifier) {
      const route = `/accounts?page=1&per_page=20&direction=desc`;
      const response: any = await this.request('GET', route);
      this.accountIdentifier = response.result[0].id;
    }
    return this.accountIdentifier;
  }

  /**
   * gets a zone id of a domain from cloudflare
   * @param domainName
   */
  public async getZoneId(domainName: string) {
    const domain = new plugins.smartstring.Domain(domainName);
    const zoneArray = await this.convenience.listZones(domain.zoneName);
    const filteredResponse = zoneArray.filter(zoneArg => {
      return zoneArg.name === domainName;
    });
    if (filteredResponse.length >= 1) {
      return filteredResponse[0].id;
    } else {
      plugins.smartlog.defaultLogger.log(
        'error',
        `the domain ${domainName} does not appear to be in this account!`
      );
      throw new Error(`the domain ${domainName} does not appear to be in this account!`);
    }
  }

  public convenience = {
    /**
     * gets a record
     * @param domainNameArg
     * @param typeArg
     */
    getRecord: async (
      domainNameArg: string,
      typeArg: plugins.tsclass.network.TDnsRecordType
    ): Promise<interfaces.ICflareRecord> => {
      const domain = new plugins.smartstring.Domain(domainNameArg);
      const recordArrayArg = await this.convenience.listRecords(domain.zoneName);
      const filteredResponse = recordArrayArg.filter(recordArg => {
        return recordArg.type === typeArg && recordArg.name === domainNameArg;
      });
      return filteredResponse[0];
    },
    /**
     * creates a record
     */
    createRecord: async (
      domainNameArg: string,
      typeArg: plugins.tsclass.network.TDnsRecordType,
      contentArg: string
    ): Promise<any> => {
      const domain = new plugins.smartstring.Domain(domainNameArg);
      const domainIdArg = await this.getZoneId(domain.zoneName);
      const dataObject = {
        name: domain.fullName,
        type: typeArg,
        content: contentArg
      };
      const response = await this.request(
        'POST',
        '/zones/' + domainIdArg + '/dns_records',
        dataObject
      );
      return response;
    },
    /**
     * removes a record from Cloudflare
     * @param domainNameArg
     * @param typeArg
     */
    removeRecord: async (
      domainNameArg: string,
      typeArg: plugins.tsclass.network.TDnsRecordType
    ): Promise<any> => {
      const domain = new plugins.smartstring.Domain(domainNameArg);
      const cflareRecord = await this.convenience.getRecord(domain.fullName, typeArg);
      if (cflareRecord) {
        const requestRoute: string = `/zones/${cflareRecord.zone_id}/dns_records/${cflareRecord.id}`;
        return await this.request('DELETE', requestRoute);
      } else {
        throw new Error(`could not remove record for ${domainNameArg} with type ${typeArg}`);
      }
    },
    /**
     * cleanrecord allows the cleaning of any previous records to avoid unwanted sideeffects
     */
    cleanRecord: async (domainNameArg: string, typeArg: plugins.tsclass.network.TDnsRecordType) => {
      console.log(`cleaning record for ${domainNameArg}`);
    },
    /**
     * updates a record
     * @param domainNameArg
     * @param typeArg
     * @param valueArg
     */
    updateRecord: async (domainNameArg: string, typeArg: plugins.tsclass.network.TDnsRecordType, valueArg) => {
      // TODO: implement
      const domain = new plugins.smartstring.Domain(domainNameArg);
    },
    /**
     * list all records of a specified domain name
     * @param domainNameArg - the domain name that you want to get the records from
     */
    listRecords: async (domainNameArg: string): Promise<interfaces.ICflareRecord[]> => {
      const domain = new plugins.smartstring.Domain(domainNameArg);
      const domainId = await this.getZoneId(domain.zoneName);
      const responseArg: any = await this.request(
        'GET',
        '/zones/' + domainId + '/dns_records?per_page=100'
      );
      const result: interfaces.ICflareRecord[] = responseArg.result;
      return result;
    },
    /**
     * list all zones in the associated authenticated account
     * @param domainName
     */
    listZones: async (domainName?: string): Promise<interfaces.ICflareZone[]> => {
      // TODO: handle pagination
      let requestRoute = `/zones?per_page=50`;

      // may be optionally filtered by domain name
      if (domainName) {
        requestRoute = `${requestRoute}&name=${domainName}`;
      }

      const response: any = await this.request('GET', requestRoute);
      const result = response.result;
      return result;
    },
    /**
     * purges a zone
     */
    purgeZone: async (domainName: string): Promise<void> => {
      const domain = new plugins.smartstring.Domain(domainName);
      const domainId = await this.getZoneId(domain.zoneName);
      const requestUrl = `/zones/${domainId}/purge_cache`;
      const payload = {
        purge_everything: true
      };
      const respone = await this.request('DELETE', requestUrl, payload);
    },
    // acme convenience functions
    acmeSetDnsChallenge: async (dnsChallenge: plugins.tsclass.network.IDnsChallenge) => {
      await this.convenience.cleanRecord(dnsChallenge.hostName, 'TXT');
      await this.convenience.createRecord(dnsChallenge.hostName, 'TXT', dnsChallenge.challenge);
    },
    acmeRemoveDnsChallenge: async (dnsChallenge: plugins.tsclass.network.IDnsChallenge) => {
      await this.convenience.removeRecord(dnsChallenge.hostName, 'TXT');
    }
  };

  public request(
    methodArg: string,
    routeArg: string,
    dataArg: any = {},
    requestHeadersArg = {}
  ): Promise<any> {
    const done = plugins.smartpromise.defer();
    const options: plugins.smartrequest.ISmartRequestOptions = {
      method: methodArg,
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Email': this.authEmail,
        'X-Auth-Key': this.authKey,
        'Content-Length': Buffer.byteLength(JSON.stringify(dataArg)),
        ...requestHeadersArg
      },
      requestBody: dataArg
    };

    // console.log(options);

    let retryCount = 0; // count the amount of retries

    const makeRequest = async () => {
      const response: any = await plugins.smartrequest.request(
        `https://api.cloudflare.com/client/v4${routeArg}`,
        options
      );
      if (response.statusCode === 200) {
        done.resolve(response.body);
      } else if (response.statusCode === 429) {
        console.log('rate limited! Waiting for retry!');
        retryRequest();
      } else if (response.statusCode === 400) {
        console.log(`bad request for route ${routeArg}! Going to retry!`);
        console.log(response.body);
      } else {
        console.log(response.statusCode);
        done.reject(new Error('request failed'));
      }
    };
    const retryRequest = async (
      delayTimeArg = Math.floor(Math.random() * (60000 - 8000) + 8000)
    ) => {
      console.log(`retry started and waiting for ${delayTimeArg} ms`);
      await plugins.smartdelay.delayFor(delayTimeArg);
      if (retryCount < 10) {
        retryCount++;
        return await makeRequest();
      }
    };
    makeRequest();
    return done.promise;
  }

  private authCheck() {
    return this.authEmail && this.authKey; // check if auth is available
  }
}
