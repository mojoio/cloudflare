"use strict";
require("typings-global");
const plugins = require("./cflare.plugins");
class CflareAccount {
    constructor() {
    }
    authCheck() {
        return (this.authEmail && this.authKey); //check if auth is available
    }
    ;
    auth(optionsArg) {
        this.authEmail = optionsArg.email;
        this.authKey = optionsArg.key;
    }
    getZoneId(domainName) {
        let done = plugins.q.defer();
        this.listZones(domainName)
            .then((responseArg) => {
            let filteredResponse = responseArg.result.filter((zoneArg) => {
                return zoneArg.name === domainName;
            });
            if (filteredResponse.length >= 1) {
                done.resolve(filteredResponse[0].id);
            }
            else {
                plugins.beautylog.error("the domain " + domainName.blue + " does not appear to be in this account!");
                done.reject(undefined);
            }
        });
        return done.promise;
    }
    getRecord(domainNameArg, typeArg) {
        let done = plugins.q.defer();
        let domain = new plugins.smartstring.Domain(domainNameArg);
        this.listRecords(domain.zoneName)
            .then((responseArg) => {
            let filteredResponse = responseArg.result.filter((recordArg) => {
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
        let domain = new plugins.smartstring.Domain(domainNameArg);
        this.getZoneId(domain.zoneName)
            .then((domainIdArg) => {
            this.request("GET", "/zones/" + domainIdArg + "/dns_records?per_page=100")
                .then(function (responseArg) {
                done.resolve(responseArg);
            });
        });
        return done.promise;
    }
    listZones(domainName) {
        let done = plugins.q.defer();
        let requestRoute = "/zones?per_page=50";
        if (domainName)
            requestRoute = requestRoute + "&name=" + domainName;
        let result = {};
        this.request("GET", requestRoute)
            .then(function (responseArg) {
            result = responseArg;
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
        plugins.request(options, function (err, res, body) {
            if (!err && res.statusCode == 200) {
                var responseObj = JSON.parse(body);
                done.resolve(responseObj);
            }
            else {
                console.log(err);
                console.log(res);
                done.reject(err);
            }
            ;
        });
        return done.promise;
    }
}
exports.CflareAccount = CflareAccount;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2ZsYXJlLmNsYXNzZXMuY2ZsYXJlYWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL2NmbGFyZS5jbGFzc2VzLmNmbGFyZWFjY291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUN4QixNQUFPLE9BQU8sV0FBVyxrQkFBa0IsQ0FBQyxDQUFDO0FBRzdDO0lBTUk7SUFFQSxDQUFDO0lBTE8sU0FBUztRQUNiLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsNEJBQTRCO0lBQ3pFLENBQUM7O0lBSUQsSUFBSSxDQUFDLFVBQW9DO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUM7SUFDbEMsQ0FBQztJQUNELFNBQVMsQ0FBQyxVQUFpQjtRQUN2QixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO2FBQ3JCLElBQUksQ0FBQyxDQUFDLFdBQVc7WUFDZCxJQUFJLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTztnQkFDckQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDekMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE9BQU8sQ0FB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