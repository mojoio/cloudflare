"use strict";
require("typings-test");
var cflare = require("../dist/index");
var should = require("should");
var qenv_1 = require("qenv");
var testQenv = new qenv_1.Qenv(process.cwd(), process.cwd() + "/.nogit");
var testCflareAccount = new cflare.CflareAccount();
testCflareAccount.auth({
    email: process.env.CF_EMAIL,
    key: process.env.CF_KEY
});
describe("cflare", function () {
    describe(".CflareAccount", function () {
        describe(".listZones()", function () {
            it("should display an account", function (done) {
                this.timeout(10000);
                testCflareAccount.listZones()
                    .then(function (responseArg) {
                    console.log(responseArg);
                    done();
                });
            });
        });
        describe(".getZoneId(domainName)", function () {
            it("should get an Cloudflare Id for a domain string", function (done) {
                this.timeout(10000);
                testCflareAccount.getZoneId("bleu.de")
                    .then(function (responseArg) {
                    console.log(responseArg);
                    done();
                });
            });
        });
        describe(".listRecords(domainName)", function () {
            it("should list all records for a specific Domain Name", function (done) {
                this.timeout(10000);
                testCflareAccount.listRecords("bleu.de")
                    .then(function (responseArg) {
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
        describe(".removeRecord", function () {
            /*it("should remove a record from Cloudflare",function(done){
                testCflareAccount.removeRecord()
                    .then(function(responseArg){
                        console.log(responseArg);
                        done();
                    });
            });*/
        });
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FBYyxDQUFDLENBQUE7QUFDdEIsSUFBTyxNQUFNLFdBQVcsZUFBZSxDQUFDLENBQUM7QUFDekMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9CLHFCQUFtQixNQUFNLENBQUMsQ0FBQTtBQUMxQixJQUFJLFFBQVEsR0FBRyxJQUFJLFdBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDO0FBRWpFLElBQUksaUJBQWlCLEdBQUcsSUFBSSxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDbkQsaUJBQWlCLENBQUMsSUFBSSxDQUFDO0lBQ25CLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVE7SUFDM0IsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTtDQUMxQixDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsUUFBUSxFQUFDO0lBQ2QsUUFBUSxDQUFDLGdCQUFnQixFQUFDO1FBQ3RCLFFBQVEsQ0FBQyxjQUFjLEVBQUM7WUFDcEIsRUFBRSxDQUFDLDJCQUEyQixFQUFDLFVBQVMsSUFBSTtnQkFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEIsaUJBQWlCLENBQUMsU0FBUyxFQUFFO3FCQUN4QixJQUFJLENBQUMsVUFBQyxXQUFXO29CQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3pCLElBQUksRUFBRSxDQUFDO2dCQUNYLENBQUMsQ0FBQyxDQUFBO1lBQ1YsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILFFBQVEsQ0FBQyx3QkFBd0IsRUFBQztZQUM5QixFQUFFLENBQUMsaURBQWlELEVBQUMsVUFBUyxJQUFJO2dCQUM5RCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUNuQixpQkFBaUIsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO3FCQUNqQyxJQUFJLENBQUMsVUFBQyxXQUFXO29CQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3pCLElBQUksRUFBRSxDQUFDO2dCQUNYLENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILFFBQVEsQ0FBQywwQkFBMEIsRUFBQztZQUNoQyxFQUFFLENBQUMsb0RBQW9ELEVBQUMsVUFBUyxJQUFJO2dCQUNqRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwQixpQkFBaUIsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO3FCQUNuQyxJQUFJLENBQUMsVUFBQyxXQUFXO29CQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3pCLElBQUksRUFBRSxDQUFDO2dCQUNYLENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQTtRQUNGLFFBQVEsQ0FBQyxlQUFlLEVBQUM7WUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQixFQUFFLENBQUMsbURBQW1ELEVBQUMsVUFBUyxJQUFJO2dCQUNoRSxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxXQUFXLENBQUM7cUJBQ3BELElBQUksQ0FBQyxVQUFTLFdBQVc7b0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3pCLElBQUksRUFBRSxDQUFDO2dCQUNYLENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7WUFDSCxFQUFFLENBQUMsOENBQThDLEVBQUMsVUFBUyxJQUFJO2dCQUMzRCxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUMsR0FBRyxFQUFDLFdBQVcsQ0FBQztxQkFDOUQsSUFBSSxDQUFDLFVBQVMsV0FBVztvQkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDekIsSUFBSSxFQUFFLENBQUM7Z0JBQ1gsQ0FBQyxDQUFDLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsUUFBUSxDQUFDLGVBQWUsRUFBQztZQUNyQjs7Ozs7O2lCQU1LO1FBQ1QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJ0eXBpbmdzLXRlc3RcIjtcbmltcG9ydCBjZmxhcmUgPSByZXF1aXJlKFwiLi4vZGlzdC9pbmRleFwiKTtcbmxldCBzaG91bGQgPSByZXF1aXJlKFwic2hvdWxkXCIpO1xuaW1wb3J0IHtRZW52fSBmcm9tIFwicWVudlwiO1xubGV0IHRlc3RRZW52ID0gbmV3IFFlbnYocHJvY2Vzcy5jd2QoKSxwcm9jZXNzLmN3ZCgpICsgXCIvLm5vZ2l0XCIpOyBcblxubGV0IHRlc3RDZmxhcmVBY2NvdW50ID0gbmV3IGNmbGFyZS5DZmxhcmVBY2NvdW50KCk7XG50ZXN0Q2ZsYXJlQWNjb3VudC5hdXRoKHtcbiAgICBlbWFpbDogcHJvY2Vzcy5lbnYuQ0ZfRU1BSUwsXG4gICAga2V5OiBwcm9jZXNzLmVudi5DRl9LRVlcbn0pO1xuXG5kZXNjcmliZShcImNmbGFyZVwiLGZ1bmN0aW9uKCl7XG4gICAgZGVzY3JpYmUoXCIuQ2ZsYXJlQWNjb3VudFwiLGZ1bmN0aW9uKCl7XG4gICAgICAgIGRlc2NyaWJlKFwiLmxpc3Rab25lcygpXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIGRpc3BsYXkgYW4gYWNjb3VudFwiLGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgICAgICAgICAgIHRoaXMudGltZW91dCgxMDAwMCk7XG4gICAgICAgICAgICAgICAgdGVzdENmbGFyZUFjY291bnQubGlzdFpvbmVzKClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlQXJnKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VBcmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZShcIi5nZXRab25lSWQoZG9tYWluTmFtZSlcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgZ2V0IGFuIENsb3VkZmxhcmUgSWQgZm9yIGEgZG9tYWluIHN0cmluZ1wiLGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgICAgICAgICAgIHRoaXMudGltZW91dCgxMDAwMClcbiAgICAgICAgICAgICAgICB0ZXN0Q2ZsYXJlQWNjb3VudC5nZXRab25lSWQoXCJibGV1LmRlXCIpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZUFyZyk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlQXJnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKFwiLmxpc3RSZWNvcmRzKGRvbWFpbk5hbWUpXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIGxpc3QgYWxsIHJlY29yZHMgZm9yIGEgc3BlY2lmaWMgRG9tYWluIE5hbWVcIixmdW5jdGlvbihkb25lKXtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQoMTAwMDApO1xuICAgICAgICAgICAgICAgIHRlc3RDZmxhcmVBY2NvdW50Lmxpc3RSZWNvcmRzKFwiYmxldS5kZVwiKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2VBcmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlQXJnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgZGVzY3JpYmUoXCIuY3JlYXRlUmVjb3JkXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHRoaXMudGltZW91dCgxMDAwMCk7XG4gICAgICAgICAgICBpdChcInNob3VsZCBjcmVhdGUgYSB2YWxpZCByZWNvcmQgZm9yIGEgbGV2ZWwgMiBkb21haW5cIixmdW5jdGlvbihkb25lKXtcbiAgICAgICAgICAgICAgICB0ZXN0Q2ZsYXJlQWNjb3VudC5jcmVhdGVSZWNvcmQoXCJibGV1LmRlXCIsXCJBXCIsXCIxMjcuMC4wLjFcIilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2VBcmcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VBcmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgY3JlYXRlIGEgdmFsaWQgcmVjb3JkIGZvciBhIHN1YmRvbWFpblwiLGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgICAgICAgICAgIHRlc3RDZmxhcmVBY2NvdW50LmNyZWF0ZVJlY29yZChcInN1YmRvbWFpbi5ibGV1LmRlXCIsXCJBXCIsXCIxMjcuMC4wLjFcIilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2VBcmcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VBcmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVzY3JpYmUoXCIucmVtb3ZlUmVjb3JkXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8qaXQoXCJzaG91bGQgcmVtb3ZlIGEgcmVjb3JkIGZyb20gQ2xvdWRmbGFyZVwiLGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgICAgICAgICAgIHRlc3RDZmxhcmVBY2NvdW50LnJlbW92ZVJlY29yZCgpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlQXJnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlQXJnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTsqL1xuICAgICAgICB9KTtcbiAgICB9KVxufSk7XG4iXX0=
