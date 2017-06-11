"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("typings-global");
const plugins = require("./cflare.plugins");
class CflareAccount {
    constructor() {
        // Nothing here
    }
    auth(optionsArg) {
        this.authEmail = optionsArg.email;
        this.authKey = optionsArg.key;
    }
    getZoneId(domainName) {
        return __awaiter(this, void 0, void 0, function* () {
            let domain = new plugins.smartstring.Domain(domainName);
            let zoneArray = yield this.listZones(domain.zoneName);
            let filteredResponse = zoneArray.filter((zoneArg) => {
                return zoneArg.name === domainName;
            });
            if (filteredResponse.length >= 1) {
                return filteredResponse[0].id;
            }
            else {
                plugins.beautylog.error(`the domain ${domainName} does not appear to be in this account!`);
                throw new Error(`the domain ${domainName} does not appear to be in this account!`);
            }
        });
    }
    getRecord(domainNameArg, typeArg) {
        let done = plugins.q.defer();
        let result;
        let domain = new plugins.smartstring.Domain(domainNameArg);
        this.listRecords(domain.zoneName)
            .then((recordArrayArg) => {
            let filteredResponse = recordArrayArg.filter((recordArg) => {
                return (recordArg.type === typeArg && recordArg.name === domainNameArg);
            });
            done.resolve(filteredResponse[0]);
        });
        return done.promise;
    }
    createRecord(domainNameArg, typeArg, contentArg) {
        return __awaiter(this, void 0, void 0, function* () {
            let done = plugins.q.defer();
            let domain = new plugins.smartstring.Domain(domainNameArg);
            let domainIdArg = yield this.getZoneId(domain.zoneName);
            let dataObject = {
                name: domain.fullName,
                type: typeArg,
                content: contentArg
            };
            this.request('POST', '/zones/' + domainIdArg + '/dns_records', dataObject)
                .then(function (responseArg) {
                done.resolve(responseArg);
            });
            return done.promise;
        });
    }
    removeRecord(domainNameArg, typeArg) {
        let done = plugins.q.defer();
        let domain = new plugins.smartstring.Domain(domainNameArg);
        this.getRecord(domain.fullName, typeArg)
            .then((responseArg) => {
            if (responseArg) {
                let requestRoute = '/zones/' + responseArg.zone_id + '/dns_records/' + responseArg.id;
                this.request('DELETE', requestRoute)
                    .then((responseArg) => {
                    done.resolve(responseArg);
                });
            }
            else {
                done.reject();
            }
        });
        return done.promise;
    }
    updateRecord(domainNameArg, typeArg, valueArg) {
        let done = plugins.q.defer();
        let domain = new plugins.smartstring.Domain(domainNameArg);
        return done.promise;
    }
    /**
     * list all records of a specified domain name
     * @param domainNameArg - the domain name that you want to get the records from
     */
    listRecords(domainNameArg) {
        return __awaiter(this, void 0, void 0, function* () {
            let domain = new plugins.smartstring.Domain(domainNameArg);
            let domainId = yield this.getZoneId(domain.zoneName);
            let responseArg = yield this.request('GET', '/zones/' + domainId + '/dns_records?per_page=100');
            let result = responseArg.result;
            return result;
        });
    }
    /**
     * list all zones in the associated authenticated account
     * @param domainName
     */
    listZones(domainName) {
        return __awaiter(this, void 0, void 0, function* () {
            let requestRoute = `/zones?per_page=50`;
            // may be optionally filtered by domain name
            if (domainName) {
                requestRoute = `${requestRoute}&name=${domainName}`;
            }
            let response = yield this.request('GET', requestRoute);
            let result = response.result;
            return result;
        });
    }
    purgeZone(domainName) {
        return __awaiter(this, void 0, void 0, function* () {
            let domain = new plugins.smartstring.Domain(domainName);
            let domainId = yield this.getZoneId(domain.zoneName);
            let requestUrl = `/zones/${domainId}/purge_cache`;
            let payload = {
                purge_everything: true
            };
            let respone = yield this.request('DELETE', requestUrl, payload);
        });
    }
    request(methodArg, routeArg, dataArg = {}) {
        let done = plugins.q.defer();
        let jsonStringArg = JSON.stringify(dataArg);
        let options = {
            method: methodArg,
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Email': this.authEmail,
                'X-Auth-Key': this.authKey,
                'Content-Length': Buffer.byteLength(jsonStringArg)
            },
            requestBody: jsonStringArg
        };
        // console.log(options);
        let retryCount = 0;
        let makeRequest = () => __awaiter(this, void 0, void 0, function* () {
            let response = yield plugins.smartrequest.request(`https://api.cloudflare.com/client/v4${routeArg}`, options);
            if (response.statusCode === 200) {
                done.resolve(response.body);
            }
            else if (response.statusCode === 429) {
                console.log('rate limited! Waiting for retry!');
                retryRequest();
            }
            else if (response.statusCode === 400) {
                console.log(`bad request for route ${routeArg}! Going to retry!`);
                retryRequest();
            }
            else {
                console.log(response.statusCode);
                done.reject(new Error('request failed'));
            }
        });
        let retryRequest = (delayTimeArg = Math.floor(Math.random() * (60000 - 8000) + 8000)) => __awaiter(this, void 0, void 0, function* () {
            console.log(`retry started and waiting for ${delayTimeArg} ms`);
            yield plugins.smartdelay.delayFor(delayTimeArg);
            if (retryCount < 10) {
                retryCount++;
                return yield makeRequest();
            }
        });
        makeRequest();
        return done.promise;
    }
    authCheck() {
        return (this.authEmail && this.authKey); // check if auth is available
    }
}
exports.CflareAccount = CflareAccount;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2ZsYXJlLmNsYXNzZXMuY2ZsYXJlYWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL2NmbGFyZS5jbGFzc2VzLmNmbGFyZWFjY291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDBCQUF1QjtBQUN2Qiw0Q0FBNEM7QUFNNUM7SUFHRTtRQUNFLGVBQWU7SUFDakIsQ0FBQztJQUVELElBQUksQ0FBRSxVQUEwQztRQUM5QyxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUE7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFBO0lBQy9CLENBQUM7SUFFSyxTQUFTLENBQUUsVUFBa0I7O1lBQ2pDLElBQUksTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDdkQsSUFBSSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNyRCxJQUFJLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPO2dCQUM5QyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUE7WUFDcEMsQ0FBQyxDQUFDLENBQUE7WUFDRixFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsTUFBTSxDQUFDLGdCQUFnQixDQUFFLENBQUMsQ0FBRSxDQUFDLEVBQUUsQ0FBQTtZQUNqQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsY0FBYyxVQUFVLHlDQUF5QyxDQUFDLENBQUE7Z0JBQzFGLE1BQU0sSUFBSSxLQUFLLENBQUMsY0FBYyxVQUFVLHlDQUF5QyxDQUFDLENBQUE7WUFDcEYsQ0FBQztRQUVI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