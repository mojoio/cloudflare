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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILFFBQVEsQ0FBQyxlQUFlLEVBQUM7WUFDckI7Ozs7OztpQkFNSztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwidHlwaW5ncy10ZXN0XCI7XHJcbmltcG9ydCBjZmxhcmUgPSByZXF1aXJlKFwiLi4vZGlzdC9pbmRleFwiKTtcclxubGV0IHNob3VsZCA9IHJlcXVpcmUoXCJzaG91bGRcIik7XHJcbmxldCBub2dpdCA9IHJlcXVpcmUoXCIuLi9ub2dpdC9ub2dpdC5qc29uXCIpO1xyXG5cclxubGV0IHRlc3RDZmxhcmVBY2NvdW50ID0gbmV3IGNmbGFyZS5DZmxhcmVBY2NvdW50KCk7XHJcbnRlc3RDZmxhcmVBY2NvdW50LmF1dGgoe1xyXG4gICAgZW1haWw6IG5vZ2l0LmNmZW1haWwsXHJcbiAgICBrZXk6IG5vZ2l0LmNma2V5XHJcbn0pO1xyXG5cclxuZGVzY3JpYmUoXCJjZmxhcmVcIixmdW5jdGlvbigpe1xyXG4gICAgZGVzY3JpYmUoXCIuQ2ZsYXJlQWNjb3VudFwiLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZGVzY3JpYmUoXCIubGlzdFpvbmVzKClcIixmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpdChcInNob3VsZCBkaXNwbGF5IGFuIGFjY291bnRcIixmdW5jdGlvbihkb25lKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZW91dCgxMDAwMCk7XHJcbiAgICAgICAgICAgICAgICB0ZXN0Q2ZsYXJlQWNjb3VudC5saXN0Wm9uZXMoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZUFyZyk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VBcmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGVzY3JpYmUoXCIuZ2V0Wm9uZUlkKGRvbWFpbk5hbWUpXCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaXQoXCJzaG91bGQgZ2V0IGFuIENsb3VkZmxhcmUgSWQgZm9yIGEgZG9tYWluIHN0cmluZ1wiLGZ1bmN0aW9uKGRvbmUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0KDEwMDAwKVxyXG4gICAgICAgICAgICAgICAgdGVzdENmbGFyZUFjY291bnQuZ2V0Wm9uZUlkKFwicHVzaC5yb2Nrc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZUFyZyk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VBcmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRlc2NyaWJlKFwiLmxpc3RSZWNvcmRzKGRvbWFpbk5hbWUpXCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaXQoXCJzaG91bGQgbGlzdCBhbGwgcmVjb3JkcyBmb3IgYSBzcGVjaWZpYyBEb21haW4gTmFtZVwiLGZ1bmN0aW9uKGRvbmUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0KDEwMDAwKTtcclxuICAgICAgICAgICAgICAgIHRlc3RDZmxhcmVBY2NvdW50Lmxpc3RSZWNvcmRzKFwicHVzaC5yb2Nrc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZUFyZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZUFyZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBkZXNjcmliZShcIi5jcmVhdGVSZWNvcmRcIixmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVvdXQoMTAwMDApO1xyXG4gICAgICAgICAgICBpdChcInNob3VsZCBjcmVhdGUgYSB2YWxpZCByZWNvcmQgZm9yIGEgbGV2ZWwgMiBkb21haW5cIixmdW5jdGlvbihkb25lKXtcclxuICAgICAgICAgICAgICAgIHRlc3RDZmxhcmVBY2NvdW50LmNyZWF0ZVJlY29yZChcImJsZXUuZGVcIixcIkFcIixcIjEyNy4wLjAuMVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlQXJnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VBcmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpdChcInNob3VsZCBjcmVhdGUgYSB2YWxpZCByZWNvcmQgZm9yIGEgc3ViZG9tYWluXCIsZnVuY3Rpb24oZG9uZSl7XHJcbiAgICAgICAgICAgICAgICB0ZXN0Q2ZsYXJlQWNjb3VudC5jcmVhdGVSZWNvcmQoXCJzdWJkb21haW4uYmxldS5kZVwiLFwiQVwiLFwiMTI3LjAuMC4xXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2VBcmcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZUFyZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGVzY3JpYmUoXCIucmVtb3ZlUmVjb3JkXCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgLyppdChcInNob3VsZCByZW1vdmUgYSByZWNvcmQgZnJvbSBDbG91ZGZsYXJlXCIsZnVuY3Rpb24oZG9uZSl7XHJcbiAgICAgICAgICAgICAgICB0ZXN0Q2ZsYXJlQWNjb3VudC5yZW1vdmVSZWNvcmQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlQXJnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VBcmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pOyovXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG59KTtcclxuIl19
