"use strict";
require("typings-test");
const cflare = require("../dist/index");
const qenv_1 = require("qenv");
let testQenv = new qenv_1.Qenv(process.cwd(), process.cwd() + '/.nogit');
console.log(testQenv.missingEnvVars);
let testCflareAccount = new cflare.CflareAccount();
testCflareAccount.auth({
    email: process.env.CF_EMAIL,
    key: process.env.CF_KEY
});
describe('cflare', function () {
    describe('.CflareAccount', function () {
        describe('.listZones()', function () {
            it('should display an entire account', function (done) {
                this.timeout(600000);
                testCflareAccount.listZones()
                    .then((responseArg) => {
                    done();
                });
            });
        });
        describe('.getZoneId(domainName)', function () {
            it('should get an Cloudflare Id for a domain string', function (done) {
                this.timeout(600000);
                testCflareAccount.getZoneId('bleu.de')
                    .then((responseArg) => {
                    done();
                });
            });
        });
        describe('.listRecords(domainName)', function () {
            it('should list all records for a specific Domain Name', function (done) {
                this.timeout(600000);
                testCflareAccount.listRecords('bleu.de')
                    .then((responseArg) => {
                    console.log(responseArg);
                    done();
                });
            });
        });
        describe('.createRecord', function () {
            it('should create a valid record for a level 2 domain', function (done) {
                this.timeout(600000);
                testCflareAccount.createRecord('bleu.de', 'A', '127.0.0.1')
                    .then(function (responseArg) {
                    done();
                });
            });
            it('should create a valid record for a subdomain', function (done) {
                this.timeout(600000);
                testCflareAccount.createRecord('subdomain.bleu.de', 'A', '127.0.0.1')
                    .then(function (responseArg) {
                    done();
                });
            });
        });
        describe('.getRecord', function () {
            it('should get a record from Cloudflare', function (done) {
                this.timeout(600000);
                testCflareAccount.getRecord('bleu.de', 'A')
                    .then(function (responseArg) {
                    console.log(responseArg);
                    done();
                });
            });
        });
        describe('.removeRecord', function () {
            it('should remove a record from Cloudflare', function (done) {
                this.timeout(600000);
                testCflareAccount.removeRecord('bleu.de', 'A')
                    .then(function (responseArg) {
                    console.log(responseArg);
                    done();
                });
            });
            it('should remove a subdomain record from Cloudflare', function (done) {
                this.timeout(600000);
                testCflareAccount.removeRecord('subdomain.bleu.de', 'A')
                    .then(function (responseArg) {
                    console.log(responseArg);
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFxQjtBQUNyQix3Q0FBd0M7QUFFeEMsK0JBQTJCO0FBQzNCLElBQUksUUFBUSxHQUFHLElBQUksV0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUE7QUFDakUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUE7QUFDcEMsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQTtBQUNsRCxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7SUFDbkIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUTtJQUMzQixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNO0NBQzFCLENBQUMsQ0FBQTtBQUVGLFFBQVEsQ0FBQyxRQUFRLEVBQUU7SUFDZixRQUFRLENBQUMsZ0JBQWdCLEVBQUU7UUFDdkIsUUFBUSxDQUFDLGNBQWMsRUFBRTtZQUNyQixFQUFFLENBQUMsa0NBQWtDLEVBQUUsVUFBVSxJQUFJO2dCQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUNwQixpQkFBaUIsQ0FBQyxTQUFTLEVBQUU7cUJBQ3hCLElBQUksQ0FBQyxDQUFDLFdBQVc7b0JBQ2QsSUFBSSxFQUFFLENBQUE7Z0JBQ1YsQ0FBQyxDQUFDLENBQUE7WUFDVixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO1FBQ0YsUUFBUSxDQUFDLHdCQUF3QixFQUFFO1lBQy9CLEVBQUUsQ0FBQyxpREFBaUQsRUFBRSxVQUFVLElBQUk7Z0JBQ2hFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBQ3BCLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxTQUFTLENB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