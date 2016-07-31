"use strict";
require("typings-test");
const cflare = require("../dist/index");
let should = require("should");
const qenv_1 = require("qenv");
let testQenv = new qenv_1.Qenv(process.cwd(), process.cwd() + "/.nogit");
console.log(testQenv.missingEnvVars);
let testCflareAccount = new cflare.CflareAccount();
testCflareAccount.auth({
    email: process.env.CF_EMAIL,
    key: process.env.CF_KEY
});
describe("cflare", function () {
    describe(".CflareAccount", function () {
        describe(".listZones()", function () {
            it("should display an entire account", function (done) {
                this.timeout(10000);
                testCflareAccount.listZones()
                    .then((responseArg) => {
                    console.log(responseArg);
                    done();
                });
            });
        });
        describe(".getZoneId(domainName)", function () {
            it("should get an Cloudflare Id for a domain string", function (done) {
                this.timeout(10000);
                testCflareAccount.getZoneId("bleu.de")
                    .then((responseArg) => {
                    console.log(responseArg);
                    done();
                });
            });
        });
        describe(".listRecords(domainName)", function () {
            it("should list all records for a specific Domain Name", function (done) {
                this.timeout(10000);
                testCflareAccount.listRecords("bleu.de")
                    .then((responseArg) => {
                    console.log(responseArg);
                    done();
                });
            });
        });
        describe(".createRecord", function () {
            this.timeout(10000);
            it("should create a valid record for a level 2 domain", function (done) {
                testCflareAccount.createRecord("bleu.de", "A", "127.0.0.1")
                    .then(function (responseArg) {
                    console.log(responseArg);
                    done();
                });
            });
            it("should create a valid record for a subdomain", function (done) {
                testCflareAccount.createRecord("subdomain.bleu.de", "A", "127.0.0.1")
                    .then(function (responseArg) {
                    console.log(responseArg);
                    done();
                });
            });
        });
        describe(".getRecord", function () {
            it("should get a record from Cloudflare", function (done) {
                testCflareAccount.getRecord("bleu.de", "A")
                    .then(function (responseArg) {
                    console.log(responseArg);
                    done();
                });
            });
        });
        describe(".removeRecord", function () {
            it("should remove a record from Cloudflare", function (done) {
                testCflareAccount.removeRecord("bleu.de", "A")
                    .then(function (responseArg) {
                    console.log(responseArg);
                    done();
                });
            });
            it("should remove a subdomain record from Cloudflare", function (done) {
                this.timeout(5000);
                testCflareAccount.removeRecord("subdomain.bleu.de", "A")
                    .then(function (responseArg) {
                    console.log(responseArg);
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FBYyxDQUFDLENBQUE7QUFDdEIsTUFBTyxNQUFNLFdBQVcsZUFBZSxDQUFDLENBQUM7QUFDekMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9CLHVCQUFtQixNQUFNLENBQUMsQ0FBQTtBQUMxQixJQUFJLFFBQVEsR0FBRyxJQUFJLFdBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDO0FBQ2pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3JDLElBQUksaUJBQWlCLEdBQUcsSUFBSSxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDbkQsaUJBQWlCLENBQUMsSUFBSSxDQUFDO0lBQ25CLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVE7SUFDM0IsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTtDQUMxQixDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsUUFBUSxFQUFDO0lBQ2QsUUFBUSxDQUFDLGdCQUFnQixFQUFDO1FBQ3RCLFFBQVEsQ0FBQyxjQUFjLEVBQUM7WUFDcEIsRUFBRSxDQUFDLGtDQUFrQyxFQUFDLFVBQVMsSUFBSTtnQkFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEIsaUJBQWlCLENBQUMsU0FBUyxFQUFFO3FCQUN4QixJQUFJLENBQUMsQ0FBQyxXQUFXO29CQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3pCLElBQUksRUFBRSxDQUFDO2dCQUNYLENBQUMsQ0FBQyxDQUFBO1lBQ1YsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNI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