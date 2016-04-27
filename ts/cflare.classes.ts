/// <reference path="./typings/main.d.ts" />
import plugins = require("./cflare.plugins");
import helpers = require("./cflare.classes.helpers");

class cflare {
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
    listRecords(){
        let done = plugins.q.defer();
        return done.promise;
    }
    listDomains(){
        let done = plugins.q.defer();
        return done.promise;
    };
    request(){
        let done = plugins.q.defer();
        return done.promise;
    }
};