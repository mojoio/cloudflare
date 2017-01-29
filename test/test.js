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
let randomPrefix = Math.floor(Math.random() * 2000);
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
            it('should create a valid record for a subdomain', function (done) {
                this.timeout(600000);
                testCflareAccount.createRecord(`${randomPrefix}subdomain.bleu.de`, 'A', '127.0.0.1')
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
            it('should remove a subdomain record from Cloudflare', function (done) {
                this.timeout(600000);
                testCflareAccount.removeRecord(`${randomPrefix}subdomain.bleu.de`, 'A')
                    .then(function (responseArg) {
                    console.log(responseArg);
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFxQjtBQUNyQix3Q0FBd0M7QUFFeEMsK0JBQTJCO0FBQzNCLElBQUksUUFBUSxHQUFHLElBQUksV0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUE7QUFDakUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUE7QUFDcEMsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQTtBQUNsRCxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7SUFDbkIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUTtJQUMzQixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNO0NBQzFCLENBQUMsQ0FBQTtBQUVGLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFBO0FBRW5ELFFBQVEsQ0FBQyxRQUFRLEVBQUU7SUFDZixRQUFRLENBQUMsZ0JBQWdCLEVBQUU7UUFDdkIsUUFBUSxDQUFDLGNBQWMsRUFBRTtZQUNyQixFQUFFLENBQUMsa0NBQWtDLEVBQUUsVUFBVSxJQUFJO2dCQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUNwQixpQkFBaUIsQ0FBQyxTQUFTLEVBQUU7cUJBQ3hCLElBQUksQ0FBQyxDQUFDLFdBQVc7b0JBQ2QsSUFBSSxFQUFFLENBQUE7Z0JBQ1YsQ0FBQyxDQUFDLENBQUE7WUFDVixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO1FBQ0YsUUFBUSxDQUFDLHdCQUF3QixFQUFFO1lBQy9CLEVBQUUsQ0FBQyxpREFBaUQsRUFBRSxVQUFVLElBQUk7Z0JBQ2hFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBQ3BCLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7cUJBQ2pDLElBQUksQ0FBQyxDQUFDLFdBQVc7b0JBQ2QsSUFBSSxFQUFFLENBQUE7Z0JBQ1YsQ0FBQyxDQUFDLENBQUE7WUFDVixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO1FBQ0YsUUFBUSxDQUFDLDBCQUEwQixFQUFFO1lBQ2pDLEVBQUUsQ0FBQyxvREFBb0QsRUFBRSxVQUFVLElBQUk7Z0JBQ25FLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBQ3BCLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7cUJBQ25DLElBQUksQ0FBQyxDQUFDLFdBQVc7b0JBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtvQkFDeEIsSUFBSSxFQUFFLENBQUE7Z0JBQ1YsQ0FBQyxDQUFDLENBQUE7WUFDVixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO1FBQ0YsUUFBUSxDQUFDLGVBQWUsRUFBRTtZQUN0QixFQUFFLENBQUMsOENBQThDLEVBQUUsVUFBVSxJQUFJO2dCQUM3RCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUNwQixpQkFBaUIsQ0FBQyxZQUFZLENBQUMsR0FBRyxZQUFZLG1CQUFtQixFQUFFLEdBQUcsRUFBRSxXQUFXLENBQUM7cUJBQy9FLElBQUksQ0FBQyxVQUFVLFdBQVc7b0JBQ3ZCLElBQUksRUFBRSxDQUFBO2dCQUNWLENBQUMsQ0FBQyxDQUFBO1lBQ1YsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtRQUNGLFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDbkIsRUFBRSxDQUFDLHFDQUFxQyxFQUFFLFVBQVUsSUFBSTtnQkFDcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDcEIsaUJBQWlCLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUM7cUJBQ3RDLElBQUksQ0FBQyxVQUFVLFdBQVc7b0JBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7b0JBQ3hCLElBQUksRUFBRSxDQUFBO2dCQUNWLENBQUMsQ0FBQyxDQUFBO1lBQ1YsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtRQUNGLFFBQVEsQ0FBQyxlQUFlLEVBQUU7WUFDdEIsRUFBRSxDQUFDLGtEQUFrRCxFQUFFLFVBQVUsSUFBSTtnQkFDakUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDcEIsaUJBQWlCLENBQUMsWUFBWSxDQUFDLEdBQUcsWUFBWSxtQkFBbUIsRUFBRSxHQUFHLENBQUM7cUJBQ2xFLElBQUksQ0FBQyxVQUFVLFdBQVc7b0JBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7b0JBQ3hCLElBQUksRUFBRSxDQUFBO2dCQUNWLENBQUMsQ0FBQyxDQUFBO1lBQ1YsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUEifQ==