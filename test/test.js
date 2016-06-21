"use strict";
require("typings-test");
var cflare = require("../dist/index");
var should = require("should");
var qenv_1 = require("qenv");
var testQenv = new qenv_1.Qenv(process.cwd(), process.cwd() + "/.nogit");
console.log(testQenv.missingEnvVars);
var testCflareAccount = new cflare.CflareAccount();
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
                testCflareAccount.removeRecord("subdomain.bleu.de", "A")
                    .then(function (responseArg) {
                    console.log(responseArg);
                    done();
                });
            });
        });
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcInR5cGluZ3MtdGVzdFwiO1xuaW1wb3J0IGNmbGFyZSA9IHJlcXVpcmUoXCIuLi9kaXN0L2luZGV4XCIpO1xubGV0IHNob3VsZCA9IHJlcXVpcmUoXCJzaG91bGRcIik7XG5pbXBvcnQge1FlbnZ9IGZyb20gXCJxZW52XCI7XG5sZXQgdGVzdFFlbnYgPSBuZXcgUWVudihwcm9jZXNzLmN3ZCgpLHByb2Nlc3MuY3dkKCkgKyBcIi8ubm9naXRcIik7IFxuY29uc29sZS5sb2codGVzdFFlbnYubWlzc2luZ0VudlZhcnMpO1xubGV0IHRlc3RDZmxhcmVBY2NvdW50ID0gbmV3IGNmbGFyZS5DZmxhcmVBY2NvdW50KCk7XG50ZXN0Q2ZsYXJlQWNjb3VudC5hdXRoKHtcbiAgICBlbWFpbDogcHJvY2Vzcy5lbnYuQ0ZfRU1BSUwsXG4gICAga2V5OiBwcm9jZXNzLmVudi5DRl9LRVlcbn0pO1xuXG5kZXNjcmliZShcImNmbGFyZVwiLGZ1bmN0aW9uKCl7XG4gICAgZGVzY3JpYmUoXCIuQ2ZsYXJlQWNjb3VudFwiLGZ1bmN0aW9uKCl7XG4gICAgICAgIGRlc2NyaWJlKFwiLmxpc3Rab25lcygpXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIGRpc3BsYXkgYW4gZW50aXJlIGFjY291bnRcIixmdW5jdGlvbihkb25lKXtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQoMTAwMDApO1xuICAgICAgICAgICAgICAgIHRlc3RDZmxhcmVBY2NvdW50Lmxpc3Rab25lcygpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZUFyZyk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlQXJnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVzY3JpYmUoXCIuZ2V0Wm9uZUlkKGRvbWFpbk5hbWUpXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIGdldCBhbiBDbG91ZGZsYXJlIElkIGZvciBhIGRvbWFpbiBzdHJpbmdcIixmdW5jdGlvbihkb25lKXtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQoMTAwMDApXG4gICAgICAgICAgICAgICAgdGVzdENmbGFyZUFjY291bnQuZ2V0Wm9uZUlkKFwiYmxldS5kZVwiKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2VBcmcpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZUFyZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZShcIi5saXN0UmVjb3Jkcyhkb21haW5OYW1lKVwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCBsaXN0IGFsbCByZWNvcmRzIGZvciBhIHNwZWNpZmljIERvbWFpbiBOYW1lXCIsZnVuY3Rpb24oZG9uZSl7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0KDEwMDAwKTtcbiAgICAgICAgICAgICAgICB0ZXN0Q2ZsYXJlQWNjb3VudC5saXN0UmVjb3JkcyhcImJsZXUuZGVcIilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlQXJnKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZUFyZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIGRlc2NyaWJlKFwiLmNyZWF0ZVJlY29yZFwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB0aGlzLnRpbWVvdXQoMTAwMDApO1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgY3JlYXRlIGEgdmFsaWQgcmVjb3JkIGZvciBhIGxldmVsIDIgZG9tYWluXCIsZnVuY3Rpb24oZG9uZSl7XG4gICAgICAgICAgICAgICAgdGVzdENmbGFyZUFjY291bnQuY3JlYXRlUmVjb3JkKFwiYmxldS5kZVwiLFwiQVwiLFwiMTI3LjAuMC4xXCIpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlQXJnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlQXJnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIGNyZWF0ZSBhIHZhbGlkIHJlY29yZCBmb3IgYSBzdWJkb21haW5cIixmdW5jdGlvbihkb25lKXtcbiAgICAgICAgICAgICAgICB0ZXN0Q2ZsYXJlQWNjb3VudC5jcmVhdGVSZWNvcmQoXCJzdWJkb21haW4uYmxldS5kZVwiLFwiQVwiLFwiMTI3LjAuMC4xXCIpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlQXJnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlQXJnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKFwiLmdldFJlY29yZFwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCBnZXQgYSByZWNvcmQgZnJvbSBDbG91ZGZsYXJlXCIsZnVuY3Rpb24oZG9uZSl7XG4gICAgICAgICAgICAgICAgdGVzdENmbGFyZUFjY291bnQuZ2V0UmVjb3JkKFwiYmxldS5kZVwiLFwiQVwiKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZUFyZyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZUFyZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZShcIi5yZW1vdmVSZWNvcmRcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgcmVtb3ZlIGEgcmVjb3JkIGZyb20gQ2xvdWRmbGFyZVwiLGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgICAgICAgICAgIHRlc3RDZmxhcmVBY2NvdW50LnJlbW92ZVJlY29yZChcImJsZXUuZGVcIixcIkFcIilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2VBcmcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VBcmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgcmVtb3ZlIGEgc3ViZG9tYWluIHJlY29yZCBmcm9tIENsb3VkZmxhcmVcIixmdW5jdGlvbihkb25lKXtcbiAgICAgICAgICAgICAgICB0ZXN0Q2ZsYXJlQWNjb3VudC5yZW1vdmVSZWNvcmQoXCJzdWJkb21haW4uYmxldS5kZVwiLFwiQVwiKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZUFyZyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZUFyZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pXG59KTtcbiJdfQ==
