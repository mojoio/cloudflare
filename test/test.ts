/// <reference path="../ts/typings/main.d.ts" />
import cflare = require("../dist/index");
let should = require("should");
let nogit = require("../nogit/nogit.json");

let testCflareAccount = new cflare.CflareAccount();
testCflareAccount.auth({
    email: nogit.cfemail,
    key: nogit.cfkey
});

describe("cflare",function(){
    describe(".CflareAccount",function(){
        describe(".listZones()",function(){
            it("should display an account",function(done){
                this.timeout(10000);
                testCflareAccount.listZones()
                    .then((responseArg)=>{
                        console.log(responseArg);
                        done();
                    })
            });
        });
        describe(".getZoneId(domainName)",function(){
            it("should get an Cloudflare Id for a domain string",function(done){
                this.timeout(5000)
                testCflareAccount.getZoneId("push.rocks")
                    .then((responseArg)=>{
                        console.log(responseArg);
                        done();
                    });
            });
        });
        describe(".listRecords(domainName)",function(){
            it("should list all records for a specific Domain Name",function(done){
                this.timeout(5000);
                testCflareAccount.listRecords("push.rocks")
                    .then((responseArg) => {
                        console.log(responseArg);
                        done();
                    });
            });
        })
    })
});
