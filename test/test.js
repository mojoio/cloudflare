"use strict";
require("typings-test");
var cflare = require("../dist/index");
var should = require("should");
var nogit = require("../nogit/nogit.json");
var testCflareAccount = new cflare.CflareAccount();
testCflareAccount.auth({
    email: nogit.cfemail,
    key: nogit.cfkey
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
                testCflareAccount.getZoneId("push.rocks")
                    .then(function (responseArg) {
                    console.log(responseArg);
                    done();
                });
            });
        });
        describe(".listRecords(domainName)", function () {
            it("should list all records for a specific Domain Name", function (done) {
                this.timeout(10000);
                testCflareAccount.listRecords("push.rocks")
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FBYyxDQUFDLENBQUE7QUFDdEIsSUFBTyxNQUFNLFdBQVcsZUFBZSxDQUFDLENBQUM7QUFDekMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9CLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBRTNDLElBQUksaUJBQWlCLEdBQUcsSUFBSSxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDbkQsaUJBQWlCLENBQUMsSUFBSSxDQUFDO0lBQ25CLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBTztJQUNwQixHQUFHLEVBQUUsS0FBSyxDQUFDLEtBQUs7Q0FDbkIsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLFFBQVEsRUFBQztJQUNkLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBQztRQUN0QixRQUFRLENBQUMsY0FBYyxFQUFDO1lBQ3BCLEVBQUUsQ0FBQywyQkFBMkIsRUFBQyxVQUFTLElBQUk7Z0JBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BCLGlCQUFpQixDQUFDLFNBQVMsRUFBRTtxQkFDeEIsSUFBSSxDQUFDLFVBQUMsV0FBVztvQkFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUN6QixJQUFJLEVBQUUsQ0FBQztnQkFDWCxDQUFDLENBQUMsQ0FBQTtZQUNWLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxRQUFRLENBQUMsd0JBQXdCLEVBQUM7WUFDOUIsRUFBRSxDQUFDLGlEQUFpRCxFQUFDLFVBQVMsSUFBSTtnQkFDOUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDbkIsaUJBQWlCLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQztxQkFDcEMsSUFBSSxDQUFDLFVBQUMsV0FBVztvQkFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUN6QixJQUFJLEVBQUUsQ0FBQztnQkFDWCxDQUFDLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxRQUFRLENBQUMsMEJBQTBCLEVBQUM7WUFDaEMsRUFBRSxDQUFDLG9EQUFvRCxFQUFDLFVBQVMsSUFBSTtnQkFDakUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEIsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztxQkFDdEMsSUFBSSxDQUFDLFVBQUMsV0FBVztvQkFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUN6QixJQUFJLEVBQUUsQ0FBQztnQkFDWCxDQUFDLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUE7UUFDRixRQUFRLENBQUMsZUFBZSxFQUFDO1lBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEIsRUFBRSxDQUFDLG1EQUFtRCxFQUFDLFVBQVMsSUFBSTtnQkFDaEUsaUJBQWlCLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsV0FBVyxDQUFDO3FCQUNwRCxJQUFJLENBQUMsVUFBUyxXQUFXO29CQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUN6QixJQUFJLEVBQUUsQ0FBQztnQkFDWCxDQUFDLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDO1lBQ0gsRUFBRSxDQUFDLDhDQUE4QyxFQUFDLFVBQVMsSUFBSTtnQkFDM0QsaUJBQWlCLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFDLEdBQUcsRUFBQyxXQUFXLENBQUM7cUJBQzlELElBQUksQ0FBQyxVQUFTLFdBQVc7b0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3pCLElBQUksRUFBRSxDQUFDO2dCQUNYLENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILFFBQVEsQ0FBQyxlQUFlLEVBQUM7WUFDckI7Ozs7OztpQkFNSztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwidHlwaW5ncy10ZXN0XCI7XG5pbXBvcnQgY2ZsYXJlID0gcmVxdWlyZShcIi4uL2Rpc3QvaW5kZXhcIik7XG5sZXQgc2hvdWxkID0gcmVxdWlyZShcInNob3VsZFwiKTtcbmxldCBub2dpdCA9IHJlcXVpcmUoXCIuLi9ub2dpdC9ub2dpdC5qc29uXCIpO1xuXG5sZXQgdGVzdENmbGFyZUFjY291bnQgPSBuZXcgY2ZsYXJlLkNmbGFyZUFjY291bnQoKTtcbnRlc3RDZmxhcmVBY2NvdW50LmF1dGgoe1xuICAgIGVtYWlsOiBub2dpdC5jZmVtYWlsLFxuICAgIGtleTogbm9naXQuY2ZrZXlcbn0pO1xuXG5kZXNjcmliZShcImNmbGFyZVwiLGZ1bmN0aW9uKCl7XG4gICAgZGVzY3JpYmUoXCIuQ2ZsYXJlQWNjb3VudFwiLGZ1bmN0aW9uKCl7XG4gICAgICAgIGRlc2NyaWJlKFwiLmxpc3Rab25lcygpXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIGRpc3BsYXkgYW4gYWNjb3VudFwiLGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgICAgICAgICAgIHRoaXMudGltZW91dCgxMDAwMCk7XG4gICAgICAgICAgICAgICAgdGVzdENmbGFyZUFjY291bnQubGlzdFpvbmVzKClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlQXJnKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VBcmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZShcIi5nZXRab25lSWQoZG9tYWluTmFtZSlcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgZ2V0IGFuIENsb3VkZmxhcmUgSWQgZm9yIGEgZG9tYWluIHN0cmluZ1wiLGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgICAgICAgICAgIHRoaXMudGltZW91dCgxMDAwMClcbiAgICAgICAgICAgICAgICB0ZXN0Q2ZsYXJlQWNjb3VudC5nZXRab25lSWQoXCJwdXNoLnJvY2tzXCIpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZUFyZyk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlQXJnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKFwiLmxpc3RSZWNvcmRzKGRvbWFpbk5hbWUpXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIGxpc3QgYWxsIHJlY29yZHMgZm9yIGEgc3BlY2lmaWMgRG9tYWluIE5hbWVcIixmdW5jdGlvbihkb25lKXtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQoMTAwMDApO1xuICAgICAgICAgICAgICAgIHRlc3RDZmxhcmVBY2NvdW50Lmxpc3RSZWNvcmRzKFwicHVzaC5yb2Nrc1wiKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2VBcmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlQXJnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgZGVzY3JpYmUoXCIuY3JlYXRlUmVjb3JkXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHRoaXMudGltZW91dCgxMDAwMCk7XG4gICAgICAgICAgICBpdChcInNob3VsZCBjcmVhdGUgYSB2YWxpZCByZWNvcmQgZm9yIGEgbGV2ZWwgMiBkb21haW5cIixmdW5jdGlvbihkb25lKXtcbiAgICAgICAgICAgICAgICB0ZXN0Q2ZsYXJlQWNjb3VudC5jcmVhdGVSZWNvcmQoXCJibGV1LmRlXCIsXCJBXCIsXCIxMjcuMC4wLjFcIilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2VBcmcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VBcmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgY3JlYXRlIGEgdmFsaWQgcmVjb3JkIGZvciBhIHN1YmRvbWFpblwiLGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgICAgICAgICAgIHRlc3RDZmxhcmVBY2NvdW50LmNyZWF0ZVJlY29yZChcInN1YmRvbWFpbi5ibGV1LmRlXCIsXCJBXCIsXCIxMjcuMC4wLjFcIilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2VBcmcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VBcmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVzY3JpYmUoXCIucmVtb3ZlUmVjb3JkXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8qaXQoXCJzaG91bGQgcmVtb3ZlIGEgcmVjb3JkIGZyb20gQ2xvdWRmbGFyZVwiLGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgICAgICAgICAgIHRlc3RDZmxhcmVBY2NvdW50LnJlbW92ZVJlY29yZCgpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlQXJnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlQXJnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTsqL1xuICAgICAgICB9KTtcbiAgICB9KVxufSk7XG4iXX0=
