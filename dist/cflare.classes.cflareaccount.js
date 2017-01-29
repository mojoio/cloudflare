"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        let done = plugins.q.defer();
        this.listZones(domainName)
            .then(zoneArrayArg => {
            let filteredResponse = zoneArrayArg.filter((zoneArg) => {
                return zoneArg.name === domainName;
            });
            if (filteredResponse.length >= 1) {
                done.resolve(filteredResponse[0].id);
            }
            else {
                plugins.beautylog.error(`the domain ${domainName} does not appear to be in this account!`);
                done.reject(undefined);
            }
        });
        return done.promise;
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
    ;
    createRecord(domainNameArg, typeArg, contentArg) {
        let done = plugins.q.defer();
        let domain = new plugins.smartstring.Domain(domainNameArg);
        this.getZoneId(domain.zoneName)
            .then((domainIdArg) => {
            let dataObject = {
                name: domain.fullName,
                type: typeArg,
                content: contentArg
            };
            this.request('POST', '/zones/' + domainIdArg + '/dns_records', dataObject)
                .then(function (responseArg) {
                done.resolve(responseArg);
            });
        });
        return done.promise;
    }
    ;
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
    ;
    updateRecord(domainNameArg, typeArg, valueArg) {
        let done = plugins.q.defer();
        let domain = new plugins.smartstring.Domain(domainNameArg);
        return done.promise;
    }
    ;
    listRecords(domainNameArg) {
        let done = plugins.q.defer();
        let result = [];
        let domain = new plugins.smartstring.Domain(domainNameArg);
        this.getZoneId(domain.zoneName)
            .then((domainIdArg) => {
            this.request('GET', '/zones/' + domainIdArg + '/dns_records?per_page=100')
                .then(function (responseArg) {
                result = responseArg.result;
                done.resolve(result);
            });
        });
        return done.promise;
    }
    listZones(domainName) {
        let done = plugins.q.defer();
        let requestRoute = '/zones?per_page=50';
        if (domainName)
            requestRoute = requestRoute + '&name=' + domainName;
        let result = [];
        this.request('GET', requestRoute)
            .then((responseArg) => {
            result = responseArg.result;
            done.resolve(result);
        });
        return done.promise;
    }
    ;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2ZsYXJlLmNsYXNzZXMuY2ZsYXJlYWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL2NmbGFyZS5jbGFzc2VzLmNmbGFyZWFjY291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMEJBQXdCO0FBQ3hCLDRDQUE0QztBQUk1QztJQUdJO0lBRUEsQ0FBQztJQUVELElBQUksQ0FBQyxVQUEwQztRQUMzQyxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUE7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFBO0lBQ2pDLENBQUM7SUFFRCxTQUFTLENBQUMsVUFBa0I7UUFDeEIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzthQUNyQixJQUFJLENBQUMsWUFBWTtZQUNkLElBQUksZ0JBQWdCLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU87Z0JBQy9DLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQTtZQUN0QyxDQUFDLENBQUMsQ0FBQTtZQUNGLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFFLENBQUMsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQzFDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxjQUFjLFVBQVUseUNBQXlDLENBQUMsQ0FBQTtnQkFDMUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUMxQixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDTixNQUFNLENBQUMsSUFBSSxDQUFD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