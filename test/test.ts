import "typings-test";
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
                this.timeout(10000)
                testCflareAccount.getZoneId("push.rocks")
                    .then((responseArg)=>{
                        console.log(responseArg);
                        done();
                    });
            });
        });
        describe(".listRecords(domainName)",function(){
            it("should list all records for a specific Domain Name",function(done){
                this.timeout(10000);
                testCflareAccount.listRecords("push.rocks")
                    .then((responseArg) => {
                        console.log(responseArg);
                        done();
                    });
            });
        })
        describe(".createRecord",function(){
            this.timeout(10000);
            it("should create a valid record for a level 2 domain",function(done){
                testCflareAccount.createRecord("bleu.de","A","127.0.0.1")
                    .then(function(responseArg){
                        console.log(responseArg);
                        done();
                    });
            });
            it("should create a valid record for a subdomain",function(done){
                testCflareAccount.createRecord("subdomain.bleu.de","A","127.0.0.1")
                    .then(function(responseArg){
                        console.log(responseArg);
                        done();
                    });
            });
        });
        describe(".removeRecord",function(){
            /*it("should remove a record from Cloudflare",function(done){
                testCflareAccount.removeRecord()
                    .then(function(responseArg){
                        console.log(responseArg);
                        done();
                    });
            });*/
        });
    })
});
