import plugins = require('./cloudflare.plugins');
import { logger } from './cloudflare.logger';
import * as interfaces from './interfaces';

// interfaces
import { WorkerManager } from './cloudflare.classes.workermanager';
import { ZoneManager } from './cloudflare.classes.zonemanager';

export class CloudflareAccount {
  private authToken: string;
  private accountIdentifier: string;

  public workerManager = new WorkerManager(this);
  public zoneManager = new ZoneManager(this);

  /**
   * constructor sets auth information on the CloudflareAccountInstance
   * @param optionsArg
   */
  constructor(authTokenArg: string) {
    this.authToken = authTokenArg;
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

  public convenience = {
    /**
     * gets a zone id of a domain from cloudflare
     * @param domainName
     */
    getZoneId: async (domainName: string) => {
      const domain = new plugins.smartstring.Domain(domainName);
      const zoneArray = await this.convenience.listZones(domain.zoneName);
      const filteredResponse = zoneArray.filter((zoneArg) => {
        return zoneArg.name === domainName;
      });
      if (filteredResponse.length >= 1) {
        return filteredResponse[0].id;
      } else {
        logger.log('error', `the domain ${domainName} does not appear to be in this account!`);
        throw new Error(`the domain ${domainName} does not appear to be in this account!`);
      }
    },
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
      const filteredResponse = recordArrayArg.filter((recordArg) => {
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
      contentArg: string,
      ttlArg = 1
    ): Promise<any> => {
      const domain = new plugins.smartstring.Domain(domainNameArg);
      const domainIdArg = await this.convenience.getZoneId(domain.zoneName);
      const dataObject = {
        name: domain.fullName,
        type: typeArg,
        content: contentArg,
        ttl: ttlArg,
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
    updateRecord: async (
      domainNameArg: string,
      typeArg: plugins.tsclass.network.TDnsRecordType,
      valueArg
    ) => {
      // TODO: implement
      const domain = new plugins.smartstring.Domain(domainNameArg);
    },
    /**
     * list all records of a specified domain name
     * @param domainNameArg - the domain name that you want to get the records from
     */
    listRecords: async (domainNameArg: string): Promise<interfaces.ICflareRecord[]> => {
      const domain = new plugins.smartstring.Domain(domainNameArg);
      const domainId = await this.convenience.getZoneId(domain.zoneName);
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
      const domainId = await this.convenience.getZoneId(domain.zoneName);
      const requestUrl = `/zones/${domainId}/purge_cache`;
      const payload = {
        purge_everything: true,
      };
      const respone = await this.request('DELETE', requestUrl, payload);
    },
    // acme convenience functions
    acmeSetDnsChallenge: async (dnsChallenge: plugins.tsclass.network.IDnsChallenge) => {
      await this.convenience.cleanRecord(dnsChallenge.hostName, 'TXT');
      await this.convenience.createRecord(dnsChallenge.hostName, 'TXT', dnsChallenge.challenge, 120);
    },
    acmeRemoveDnsChallenge: async (dnsChallenge: plugins.tsclass.network.IDnsChallenge) => {
      await this.convenience.removeRecord(dnsChallenge.hostName, 'TXT');
    },
  };

  public async request(
    methodArg: string,
    routeArg: string,
    dataArg: any = {},
    requestHeadersArg = {}
  ): Promise<any> {
    const options: plugins.smartrequest.ISmartRequestOptions = {
      method: methodArg,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`,
        'Content-Length': Buffer.byteLength(JSON.stringify(dataArg)),
        ...requestHeadersArg,
      },
      requestBody: dataArg,
    };

    // route analysis
    const routeWithoutQuery = routeArg.split('?')[0];
    let queryParams: string[] = [];
    if (routeArg.split('?').length > 1) {
      queryParams = routeArg.split('?')[1].split('&');
    }

    // console.log(options);

    let retryCount = 0; // count the amount of retries
    let pageCount = 1;

    const getQueryParams = () => {
      let result = '';
      if (queryParams.length > 0) {
        result += '?';
      } else {
        return result;
      }

      let isFirst = true;
      for (const queryParam of queryParams) {
        if (!isFirst) {
          result += '&';
        }
        isFirst = false;
        const queryParamSerialized = queryParam.split('=');
        if (queryParam === 'page') {
          result += `page=${pageCount}`;
        } else {
          result += queryParam;
        }
      }
      return result;
    };

    const makeRequest = async (): Promise<plugins.smartrequest.IExtendedIncomingMessage> => {
      const requestUrl = `https://api.cloudflare.com/client/v4${routeWithoutQuery}${getQueryParams()}`;
      const response = await plugins.smartrequest.request(requestUrl, options);
      if (response.statusCode === 200) {
        if (response.body.result_info) {
          const rI = response.body.result_info;
          if (rI.total_count / rI.per_page > pageCount) {
            pageCount++;
            const subresponse = await makeRequest();
            response.body.result = response.body.result.concat(subresponse.body.result);
            return response;
          } else {
            return response;
          }
        } else {
          return response;
        }
      } else if (response.statusCode === 429) {
        console.log('rate limited! Waiting for retry!');
        return await retryRequest();
      } else if (response.statusCode === 400) {
        console.log(`bad request for route ${requestUrl}!`);
        console.log(response.body);
        throw new Error(`request failed for ${requestUrl}`);
      } else {
        console.log(response.body);
        throw new Error(`request failed for ${requestUrl} with status${response.statusCode}}`);
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
    const response = await makeRequest();
    return response.body;
  }

  private authCheck() {
    return !!this.authToken; // check if auth is available
  }
}
