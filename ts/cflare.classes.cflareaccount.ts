import "typings-global";
import plugins = require("./cflare.plugins");
import helpers = require("./cflare.classes.helpers");

export class CflareAccount {
    private authEmail:string;
    private authKey:string;
    private authCheck(){
        return (this.authEmail && this.authKey); //check if auth is available
    }
    constructor(){
        
    };
    auth(optionsArg:{email:string,key:string}){
        this.authEmail = optionsArg.email;
        this.authKey = optionsArg.key;       
    }
    getZoneId(domainName:string){
        let done = plugins.q.defer();
        this.listZones(domainName)
            .then((responseArg) => {
                let filteredResponse = responseArg.result.filter((zoneArg)=>{
                    return zoneArg.name === domainName;
                });
                if (filteredResponse.length >= 1){
                    done.resolve(filteredResponse[0].id);
                } else {
                    plugins.beautylog.error("the domain " + domainName.blue + " does not appear to be in this account!");
                    done.reject(undefined);
                }
            });
        return done.promise;
    }
    getRecord(domainNameArg:string,typeArg:string){
        let done = plugins.q.defer();
        this.listRecords(domainNameArg)
            .then((responseArg) => {
                let filteredResponse = responseArg.result.filter((recordArg) => {
                    return (recordArg.type == typeArg && recordArg.name == domainNameArg); 
                })
            })
        return done.promise;
    };
    createRecord(domainNameArg:string,typeArg:string,contentArg:string){
        let done = plugins.q.defer();
        let domain = new plugins.smartstring.Domain(domainNameArg);
        let zoneName:string = domain.level2 + "." + domain.level1;
        this.getZoneId(zoneName)
            .then((domainIdArg)=>{
                let dataObject = {
                    name: domain.fullName,
                    type: typeArg,
                    content: contentArg
                };
                this.request("POST","/zones/" + domainIdArg + "/dns_records",dataObject)
                    .then(function(responseArg){
                        done.resolve(responseArg);
                    });
            });
        return done.promise;
    };
    removeRecord(domainNameArg:string,typeArg:string){
        let done = plugins.q.defer();
        let domain = new plugins.smartstring.Domain(domainNameArg);
        let zoneName = domain.level2 + "." + domain.level1;
        this.listRecords(zoneName)
            .then((responseArg) => {
                let filteredResponse = responseArg;
            });
        return done.promise;
    };
    updateRecord(domainNameArg:string,typeArg:string,valueArg){
        let done = plugins.q.defer();
        return done.promise;
    };
    listRecords(domainNameArg:string){
        let done = plugins.q.defer();
        this.getZoneId(domainNameArg)
            .then((domainIdArg)=>{
                this.request("GET","/zones/" + domainIdArg + "/dns_records?per_page=100")
                    .then(function(responseArg){
                        done.resolve(responseArg);
                    });
            });
        return done.promise;
    }
    listZones(domainName?:string){ // TODO: handle pagination
        let done = plugins.q.defer();
        let requestRoute = "/zones?per_page=50"
        if(domainName) requestRoute = requestRoute + "&name=" + domainName;
        let result = {}; 
        this.request("GET",requestRoute)
            .then(function(responseArg){
                result = responseArg;
                done.resolve(result);
            });
        return done.promise;
    };
    request(methodArg:string,routeArg:string,dataArg = {}){
        let done = plugins.q.defer();
        let jsonArg:string = JSON.stringify(dataArg);
        let options = {
            method:methodArg,
            url:"https://api.cloudflare.com/client/v4" + routeArg,
            headers:{
                "Content-Type":"application/json",
                "X-Auth-Email":this.authEmail,
                "X-Auth-Key":this.authKey
            },
            body:jsonArg
        };
        plugins.request(options,function(err, res, body){
            if (!err && res.statusCode == 200) {
                var responseObj = JSON.parse(body);
                done.resolve(responseObj);
            } else {
                console.log(err);
                console.log(res);
                done.reject(err);
            };
        });
        return done.promise;
    }
};