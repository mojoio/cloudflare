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
    authCheck() {
        return (this.authEmail && this.authKey); //check if auth is available
    }
    constructor() {
    }
    ;
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
                return (recordArg.type == typeArg && recordArg.name == domainNameArg);
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
            this.request("POST", "/zones/" + domainIdArg + "/dns_records", dataObject)
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
                let requestRoute = "/zones/" + responseArg.zone_id + "/dns_records/" + responseArg.id;
                this.request("DELETE", requestRoute)
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
            this.request("GET", "/zones/" + domainIdArg + "/dns_records?per_page=100")
                .then(function (responseArg) {
                result = responseArg.result;
                done.resolve(result);
            });
        });
        return done.promise;
    }
    listZones(domainName) {
        let done = plugins.q.defer();
        let requestRoute = "/zones?per_page=50";
        if (domainName)
            requestRoute = requestRoute + "&name=" + domainName;
        let result = [];
        this.request("GET", requestRoute)
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
            url: "https://api.cloudflare.com/client/v4" + routeArg,
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Email": this.authEmail,
                "X-Auth-Key": this.authKey
            },
            body: jsonArg
        };
        //console.log(options);
        let retryCount = 0;
        let makeRequest = () => {
            plugins.request(options, function (err, res, body) {
                let responseObj;
                try {
                    responseObj = JSON.parse(body);
                }
                catch (err) {
                    console.log(res.statusCode);
                    retryRequest();
                    return;
                }
                if (!err && res.statusCode === 200) {
                    done.resolve(responseObj);
                }
                else if (!err && res.statusCode === 429) {
                    console.log('rate limited! Waiting for retry!');
                    retryRequest();
                    return;
                }
                else {
                    console.log(res.statusCode);
                    console.log(responseObj.messages);
                    console.log(responseObj.errors);
                    done.reject(err);
                }
                ;
            });
        };
        let retryRequest = (delayTimeArg = 15000) => __awaiter(this, void 0, void 0, function* () {
            console.log(`retry started and waiting for ${delayTimeArg} ms`);
            yield plugins.smartdelay.delayFor(delayTimeArg);
            if (retryCount < 3) {
                retryCount++;
                makeRequest();
                return;
            }
        });
        makeRequest();
        return done.promise;
    }
}
exports.CflareAccount = CflareAccount;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2ZsYXJlLmNsYXNzZXMuY2ZsYXJlYWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL2NmbGFyZS5jbGFzc2VzLmNmbGFyZWFjY291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMEJBQXdCO0FBQ3hCLDRDQUE2QztBQUk3QztJQUdZLFNBQVM7UUFDYixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLDRCQUE0QjtJQUN6RSxDQUFDO0lBQ0Q7SUFFQSxDQUFDO0lBQUEsQ0FBQztJQUNGLElBQUksQ0FBQyxVQUEwQztRQUMzQyxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDO0lBQ2xDLENBQUM7SUFDRCxTQUFTLENBQUMsVUFBa0I7UUFDeEIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzthQUNyQixJQUFJLENBQUMsWUFBWTtZQUNkLElBQUksZ0JBQWdCLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU87Z0JBQy9DLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztZQUNILEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxjQUFjLFVBQVUseUNBQXlD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