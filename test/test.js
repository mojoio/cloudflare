"use strict";
/// <reference path="../ts/typings/main.d.ts" />
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
                this.timeout(5000);
                testCflareAccount.getZoneId("push.rocks")
                    .then(function (responseArg) {
                    console.log(responseArg);
                    done();
                });
            });
        });
        describe(".listRecords(domainName)", function () {
            it("should list all records for a specific Domain Name", function (done) {
                this.timeout(5000);
                testCflareAccount.listRecords("push.rocks")
                    .then(function (responseArg) {
                    console.log(responseArg);
                    done();
                });
            });
        });
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGdEQUFnRDtBQUNoRCxJQUFPLE1BQU0sV0FBVyxlQUFlLENBQUMsQ0FBQztBQUN6QyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDL0IsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFFM0MsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUNuRCxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7SUFDbkIsS0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPO0lBQ3BCLEdBQUcsRUFBRSxLQUFLLENBQUMsS0FBSztDQUNuQixDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsUUFBUSxFQUFDO0lBQ2QsUUFBUSxDQUFDLGdCQUFnQixFQUFDO1FBQ3RCLFFBQVEsQ0FBQyxjQUFjLEVBQUM7WUFDcEIsRUFBRSxDQUFDLDJCQUEyQixFQUFDLFVBQVMsSUFBSTtnQkFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEIsaUJBQWlCLENBQUMsU0FBUyxFQUFFO3FCQUN4QixJQUFJLENBQUMsVUFBQyxXQUFXO29CQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3pCLElBQUksRUFBRSxDQUFDO2dCQUNYLENBQUMsQ0FBQyxDQUFBO1lBQ1YsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILFFBQVEsQ0FBQyx3QkFBd0IsRUFBQztZQUM5QixFQUFFLENBQUMsaURBQWlELEVBQUMsVUFBUyxJQUFJO2dCQUM5RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNsQixpQkFBaUIsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO3FCQUNwQyxJQUFJLENBQUMsVUFBQyxXQUFXO29CQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3pCLElBQUksRUFBRSxDQUFDO2dCQUNYLENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILFFBQVEsQ0FBQywwQkFBMEIsRUFBQztZQUNoQyxFQUFFLENBQUMsb0RBQW9ELEVBQUMsVUFBUyxJQUFJO2dCQUNqRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuQixpQkFBaUIsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO3FCQUN0QyxJQUFJLENBQUMsVUFBQyxXQUFXO29CQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3pCLElBQUksRUFBRSxDQUFDO2dCQUNYLENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90cy90eXBpbmdzL21haW4uZC50c1wiIC8+XHJcbmltcG9ydCBjZmxhcmUgPSByZXF1aXJlKFwiLi4vZGlzdC9pbmRleFwiKTtcclxubGV0IHNob3VsZCA9IHJlcXVpcmUoXCJzaG91bGRcIik7XHJcbmxldCBub2dpdCA9IHJlcXVpcmUoXCIuLi9ub2dpdC9ub2dpdC5qc29uXCIpO1xyXG5cclxubGV0IHRlc3RDZmxhcmVBY2NvdW50ID0gbmV3IGNmbGFyZS5DZmxhcmVBY2NvdW50KCk7XHJcbnRlc3RDZmxhcmVBY2NvdW50LmF1dGgoe1xyXG4gICAgZW1haWw6IG5vZ2l0LmNmZW1haWwsXHJcbiAgICBrZXk6IG5vZ2l0LmNma2V5XHJcbn0pO1xyXG5cclxuZGVzY3JpYmUoXCJjZmxhcmVcIixmdW5jdGlvbigpe1xyXG4gICAgZGVzY3JpYmUoXCIuQ2ZsYXJlQWNjb3VudFwiLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZGVzY3JpYmUoXCIubGlzdFpvbmVzKClcIixmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpdChcInNob3VsZCBkaXNwbGF5IGFuIGFjY291bnRcIixmdW5jdGlvbihkb25lKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZW91dCgxMDAwMCk7XHJcbiAgICAgICAgICAgICAgICB0ZXN0Q2ZsYXJlQWNjb3VudC5saXN0Wm9uZXMoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZUFyZyk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VBcmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGVzY3JpYmUoXCIuZ2V0Wm9uZUlkKGRvbWFpbk5hbWUpXCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaXQoXCJzaG91bGQgZ2V0IGFuIENsb3VkZmxhcmUgSWQgZm9yIGEgZG9tYWluIHN0cmluZ1wiLGZ1bmN0aW9uKGRvbmUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0KDUwMDApXHJcbiAgICAgICAgICAgICAgICB0ZXN0Q2ZsYXJlQWNjb3VudC5nZXRab25lSWQoXCJwdXNoLnJvY2tzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlQXJnKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZUFyZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGVzY3JpYmUoXCIubGlzdFJlY29yZHMoZG9tYWluTmFtZSlcIixmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpdChcInNob3VsZCBsaXN0IGFsbCByZWNvcmRzIGZvciBhIHNwZWNpZmljIERvbWFpbiBOYW1lXCIsZnVuY3Rpb24oZG9uZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQoNTAwMCk7XHJcbiAgICAgICAgICAgICAgICB0ZXN0Q2ZsYXJlQWNjb3VudC5saXN0UmVjb3JkcyhcInB1c2gucm9ja3NcIilcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2VBcmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VBcmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59KTtcclxuIl19