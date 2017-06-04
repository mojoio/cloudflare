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
    }
    auth(optionsArg) {
        this.authEmail = optionsArg.email;
        this.authKey = optionsArg.key;
    }
    getZoneId(domainName) {
        return __awaiter(this, void 0, void 0, function* () {
            let zoneArray = yield this.listZones(domainName);
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
            let requestRoute = '/zones?per_page=50';
            // may be optionally filtered by domain name
            if (domainName) {
                requestRoute = requestRoute + '&name=' + domainName;
            }
            let response = yield this.request('GET', requestRoute);
            let result = response.result;
            return result;
        });
    }
    request(methodArg, routeArg, dataArg = {}) {
        let done = plugins.q.defer();
        let jsonArg = JSON.stringify(dataArg);
        let options = {
            method: methodArg,
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Email': this.authEmail,
                'X-Auth-Key': this.authKey
            },
            requestBody: jsonArg
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
                console.log('bad request! Going to retry!');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2ZsYXJlLmNsYXNzZXMuY2ZsYXJlYWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL2NmbGFyZS5jbGFzc2VzLmNmbGFyZWFjY291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDBCQUF1QjtBQUN2Qiw0Q0FBNEM7QUFHNUM7SUFHRTtJQUVBLENBQUM7SUFFRCxJQUFJLENBQUUsVUFBMEM7UUFDOUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFBO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQTtJQUMvQixDQUFDO0lBRUssU0FBUyxDQUFFLFVBQWtCOztZQUNqQyxJQUFJLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDaEQsSUFBSSxnQkFBZ0IsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTztnQkFDOUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFBO1lBQ3BDLENBQUMsQ0FBQyxDQUFBO1lBQ0YsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBRSxDQUFDLENBQUUsQ0FBQyxFQUFFLENBQUE7WUFDakMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGNBQWMsVUFBVSx5Q0FBeUMsQ0FBQyxDQUFBO2dCQUMxRixNQUFNLElBQUksS0FBSyxDQUFDLGNBQWMsVUFBVSx5Q0FBeUMsQ0FBQyxDQUFBO1lBQ3BGLENBQUM7UUFFSCxDQUFDO0tBQUE7SUFDRCxTQUFTLENBQUUsYUFBcUIsRUFBRSxPQUFlO1FBQy9DLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFF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