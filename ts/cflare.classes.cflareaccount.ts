import 'typings-global'
import plugins = require('./cflare.plugins')
import * as interfaces from './cflare.interfaces'

export class CflareAccount {
  private authEmail: string
  private authKey: string
  constructor() {

  }

  auth (optionsArg: { email: string, key: string }) {
    this.authEmail = optionsArg.email
    this.authKey = optionsArg.key
  }

  async getZoneId (domainName: string) {
    let zoneArray = await this.listZones(domainName)
    let filteredResponse = zoneArray.filter((zoneArg) => {
      return zoneArg.name === domainName
    })
    if (filteredResponse.length >= 1) {
      return filteredResponse[ 0 ].id
    } else {
      plugins.beautylog.error(`the domain ${domainName} does not appear to be in this account!`)
      throw new Error(`the domain ${domainName} does not appear to be in this account!`)
    }

  }
  getRecord (domainNameArg: string, typeArg: interfaces.TRecord): Promise<interfaces.ICflareRecord> {
    let done = plugins.q.defer()
    let result: interfaces.ICflareRecord

    let domain = new plugins.smartstring.Domain(domainNameArg)
    this.listRecords(domain.zoneName)
      .then((recordArrayArg) => {
        let filteredResponse = recordArrayArg.filter((recordArg) => {
          return (recordArg.type === typeArg && recordArg.name === domainNameArg)
        })
        done.resolve(filteredResponse[ 0 ])
      })
    return done.promise
  }

  async createRecord (domainNameArg: string, typeArg: interfaces.TRecord, contentArg: string) {
    let done = plugins.q.defer()
    let domain = new plugins.smartstring.Domain(domainNameArg)
    let domainIdArg = await this.getZoneId(domain.zoneName)
    let dataObject = {
      name: domain.fullName,
      type: typeArg,
      content: contentArg
    }
    this.request('POST', '/zones/' + domainIdArg + '/dns_records', dataObject)
      .then(function (responseArg) {
        done.resolve(responseArg)
      })
    return done.promise
  }

  removeRecord (domainNameArg: string, typeArg: interfaces.TRecord) {
    let done = plugins.q.defer()
    let domain = new plugins.smartstring.Domain(domainNameArg)
    this.getRecord(domain.fullName, typeArg)
      .then((responseArg) => {
        if (responseArg) {
          let requestRoute: string = '/zones/' + responseArg.zone_id + '/dns_records/' + responseArg.id
          this.request('DELETE', requestRoute)
            .then((responseArg) => {
              done.resolve(responseArg)
            })
        } else {
          done.reject()
        }
      })
    return done.promise
  }

  updateRecord (domainNameArg: string, typeArg: string, valueArg) {
    let done = plugins.q.defer()
    let domain = new plugins.smartstring.Domain(domainNameArg)
    return done.promise
  }

  /**
   * list all records of a specified domain name
   * @param domainNameArg - the domain name that you want to get the records from
   */
  async listRecords (domainNameArg: string): Promise<interfaces.ICflareRecord[]> {
    let domain = new plugins.smartstring.Domain(domainNameArg)
    let domainId = await this.getZoneId(domain.zoneName)
    let responseArg: any = await this.request('GET', '/zones/' + domainId + '/dns_records?per_page=100')
    let result: interfaces.ICflareRecord[] = responseArg.result
    return result
  }

  /**
   * list all zones in the associated authenticated account
   * @param domainName
   */
  async listZones (domainName?: string): Promise<interfaces.ICflareZone[]> { // TODO: handle pagination
    let requestRoute = '/zones?per_page=50'

    // may be optionally filtered by domain name
    if (domainName) {
      requestRoute = requestRoute + '&name=' + domainName
    }

    let response: any = await this.request('GET', requestRoute)
    let result = response.result
    return result
  }

  request (methodArg: string, routeArg: string, dataArg = {}) {
    let done = plugins.q.defer()
    let jsonArg: string = JSON.stringify(dataArg)
    let options: plugins.smartrequest.ISmartRequestOptions = {
      method: methodArg,
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Email': this.authEmail,
        'X-Auth-Key': this.authKey
      },
      requestBody: jsonArg
    }
    // console.log(options);
    let retryCount = 0

    let makeRequest = async () => {
      let response: any = await plugins.smartrequest.request(
        `https://api.cloudflare.com/client/v4${routeArg}`,
        options
      )
      if (response.statusCode === 200) {
        done.resolve(response.body)
      } else if (response.statusCode === 429) {
        console.log('rate limited! Waiting for retry!')
        retryRequest()
      } else if (response.statusCode === 400) {
        console.log('bad request! Going to retry!')
      } else {
        console.log(response.statusCode)
        done.reject(new Error('request failed'))
      }
    }
    let retryRequest = async (delayTimeArg = Math.floor(Math.random() * (60000 - 8000) + 8000)) => {
      console.log(`retry started and waiting for ${delayTimeArg} ms`)
      await plugins.smartdelay.delayFor(delayTimeArg)
      if (retryCount < 10) {
        retryCount++
        return await makeRequest()
      }
    }
    makeRequest()
    return done.promise
  }

  private authCheck () {
    return (this.authEmail && this.authKey) // check if auth is available
  }
}
