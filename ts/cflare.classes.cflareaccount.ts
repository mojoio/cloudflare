/// <reference path="./typings/main.d.ts" />
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
    createRecord(){
        let done = plugins.q.defer();
        return done.promise;
    };
    removeRecord(){
        let done = plugins.q.defer();
        return done.promise;
    };
    listRecords(domainName:string){
        let done = plugins.q.defer();
        
        return done.promise;
    }
    listDomains(){
        let done = plugins.q.defer();
        this.request("GET","/zones")
            .then(function(responseArg){
                
            });
        return done.promise;
    };
    request(methodArg:string,routeArg:string){
        let done = plugins.q.defer();
        let options = {
            method:methodArg,
            url:"https://api.cloudflare.com/client/v4" + routeArg,
            headers:{
                "Content-Type":"application/json",
                "X-Auth-Email":this.authEmail,
                "X-Auth-Key":this.authKey
            }
        }
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