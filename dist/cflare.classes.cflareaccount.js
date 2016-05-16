"use strict";
/// <reference path="./typings/main.d.ts" />
var plugins = require("./cflare.plugins");
var CflareAccount = (function () {
    function CflareAccount() {
    }
    CflareAccount.prototype.authCheck = function () {
        return (this.authEmail && this.authKey); //check if auth is available
    };
    ;
    CflareAccount.prototype.auth = function (optionsArg) {
        this.authEmail = optionsArg.email;
        this.authKey = optionsArg.key;
    };
    CflareAccount.prototype.getZoneId = function (domainName) {
        var done = plugins.q.defer();
        this.listZones(domainName)
            .then(function (responseArg) {
            var filteredResponse = responseArg.result.filter(function (zoneArg) {
                return zoneArg.name === domainName;
            });
            if (filteredResponse.length >= 1) {
                done.resolve(filteredResponse[0].id);
            }
            else {
                plugins.beautylog.error("the domain " + domainName.blue + " does not appear to be in this account!");
                done.reject(undefined);
            }
        });
        return done.promise;
    };
    CflareAccount.prototype.getRecord = function (domainNameArg, typeArg) {
        var done = plugins.q.defer();
        this.listRecords(domainNameArg)
            .then(function (responseArg) {
            var filteredResponse = responseArg.result.filter(function (recordArg) {
                return (recordArg.type == typeArg && recordArg.name == domainNameArg);
            });
        });
        return done.promise;
    };
    ;
    CflareAccount.prototype.createRecord = function () {
        var done = plugins.q.defer();
        return done.promise;
    };
    ;
    CflareAccount.prototype.removeRecord = function () {
        var done = plugins.q.defer();
        return done.promise;
    };
    ;
    CflareAccount.prototype.updateRecord = function (domainNameArg, typeArg, valueArg) {
        var done = plugins.q.defer();
        return done.promise;
    };
    ;
    CflareAccount.prototype.listRecords = function (domainName) {
        var _this = this;
        var done = plugins.q.defer();
        this.getZoneId(domainName)
            .then(function (domainIdArg) {
            _this.request("GET", "/zones/" + domainIdArg + "/dns_records?per_page=100")
                .then(function (responseArg) {
                done.resolve(responseArg);
            });
        });
        return done.promise;
    };
    CflareAccount.prototype.listZones = function (domainName) {
        var done = plugins.q.defer();
        var requestRoute = "/zones?per_page=50";
        if (domainName)
            requestRoute = requestRoute + "&name=" + domainName;
        var result = {};
        this.request("GET", requestRoute)
            .then(function (responseArg) {
            result = responseArg;
            done.resolve(result);
        });
        return done.promise;
    };
    ;
    CflareAccount.prototype.request = function (methodArg, routeArg, jsonArg) {
        var done = plugins.q.defer();
        var options = {
            method: methodArg,
            url: "https://api.cloudflare.com/client/v4" + routeArg,
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Email": this.authEmail,
                "X-Auth-Key": this.authKey
            },
            json: jsonArg
        };
        plugins.request(options, function (err, res, body) {
            if (!err && res.statusCode == 200) {
                var responseObj = JSON.parse(body);
                done.resolve(responseObj);
            }
            else {
                console.log(err);
                console.log(res);
                done.reject(err);
            }
            ;
        });
        return done.promise;
    };
    return CflareAccount;
}());
exports.CflareAccount = CflareAccount;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNmbGFyZS5jbGFzc2VzLmNmbGFyZWFjY291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDRDQUE0QztBQUM1QyxJQUFPLE9BQU8sV0FBVyxrQkFBa0IsQ0FBQyxDQUFDO0FBRzdDO0lBTUk7SUFFQSxDQUFDO0lBTE8saUNBQVMsR0FBakI7UUFDSSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLDRCQUE0QjtJQUN6RSxDQUFDOztJQUlELDRCQUFJLEdBQUosVUFBSyxVQUFvQztRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDO0lBQ2xDLENBQUM7SUFDRCxpQ0FBUyxHQUFULFVBQVUsVUFBaUI7UUFDdkIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzthQUNyQixJQUFJLENBQUMsVUFBQyxXQUFXO1lBQ2QsSUFBSSxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLE9BQU87Z0JBQ3JELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztZQUNILEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLElBQUksR0FBRyx5Q0FBeUMs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QyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzdCLElBQUksT0FBTyxHQUFHO1lBQ1YsTUFBTSxFQUFDLFNBQVM7WUFDaEIsR0FBRyxFQUFDLHNDQUFzQyxHQUFHLFFBQVE7WUFDckQsT0FBTyxFQUFDO2dCQUNKLGNBQWMsRUFBQyxrQkFBa0I7Z0JBQ2pDLGNBQWMsRUFBQyxJQUFJLENBQUMsU0FBUztnQkFDN0IsWUFBWSxFQUFDLElBQUksQ0FBQyxPQUFPO2FBQzVCO1lBQ0QsSUFBSSxFQUFDLE9BQU87U0FDZixDQUFDO1FBQ0YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUMsVUFBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7WUFDM0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzlCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLENBQUM7WUFBQSxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQWxHQSxBQWtHQyxJQUFBO0FBbEdZLHFCQUFhLGdCQWtHekIsQ0FBQTtBQUFBLENBQUMiLCJmaWxlIjoiY2ZsYXJlLmNsYXNzZXMuY2ZsYXJlYWNjb3VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3R5cGluZ3MvbWFpbi5kLnRzXCIgLz5cclxuaW1wb3J0IHBsdWdpbnMgPSByZXF1aXJlKFwiLi9jZmxhcmUucGx1Z2luc1wiKTtcclxuaW1wb3J0IGhlbHBlcnMgPSByZXF1aXJlKFwiLi9jZmxhcmUuY2xhc3Nlcy5oZWxwZXJzXCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIENmbGFyZUFjY291bnQge1xyXG4gICAgcHJpdmF0ZSBhdXRoRW1haWw6c3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBhdXRoS2V5OnN0cmluZztcclxuICAgIHByaXZhdGUgYXV0aENoZWNrKCl7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmF1dGhFbWFpbCAmJiB0aGlzLmF1dGhLZXkpOyAvL2NoZWNrIGlmIGF1dGggaXMgYXZhaWxhYmxlXHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIFxyXG4gICAgfTtcclxuICAgIGF1dGgob3B0aW9uc0FyZzp7ZW1haWw6c3RyaW5nLGtleTpzdHJpbmd9KXtcclxuICAgICAgICB0aGlzLmF1dGhFbWFpbCA9IG9wdGlvbnNBcmcuZW1haWw7XHJcbiAgICAgICAgdGhpcy5hdXRoS2V5ID0gb3B0aW9uc0FyZy5rZXk7ICAgICAgIFxyXG4gICAgfVxyXG4gICAgZ2V0Wm9uZUlkKGRvbWFpbk5hbWU6c3RyaW5nKXtcclxuICAgICAgICBsZXQgZG9uZSA9IHBsdWdpbnMucS5kZWZlcigpO1xyXG4gICAgICAgIHRoaXMubGlzdFpvbmVzKGRvbWFpbk5hbWUpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZUFyZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpbHRlcmVkUmVzcG9uc2UgPSByZXNwb25zZUFyZy5yZXN1bHQuZmlsdGVyKCh6b25lQXJnKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB6b25lQXJnLm5hbWUgPT09IGRvbWFpbk5hbWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZFJlc3BvbnNlLmxlbmd0aCA+PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICBkb25lLnJlc29sdmUoZmlsdGVyZWRSZXNwb25zZVswXS5pZCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsdWdpbnMuYmVhdXR5bG9nLmVycm9yKFwidGhlIGRvbWFpbiBcIiArIGRvbWFpbk5hbWUuYmx1ZSArIFwiIGRvZXMgbm90IGFwcGVhciB0byBiZSBpbiB0aGlzIGFjY291bnQhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbmUucmVqZWN0KHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBkb25lLnByb21pc2U7XHJcbiAgICB9XHJcbiAgICBnZXRSZWNvcmQoZG9tYWluTmFtZUFyZzpzdHJpbmcsdHlwZUFyZzpzdHJpbmcpe1xyXG4gICAgICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XHJcbiAgICAgICAgdGhpcy5saXN0UmVjb3Jkcyhkb21haW5OYW1lQXJnKVxyXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2VBcmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZFJlc3BvbnNlID0gcmVzcG9uc2VBcmcucmVzdWx0LmZpbHRlcigocmVjb3JkQXJnKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChyZWNvcmRBcmcudHlwZSA9PSB0eXBlQXJnICYmIHJlY29yZEFyZy5uYW1lID09IGRvbWFpbk5hbWVBcmcpOyBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGRvbmUucHJvbWlzZTtcclxuICAgIH07XHJcbiAgICBjcmVhdGVSZWNvcmQoKXtcclxuICAgICAgICBsZXQgZG9uZSA9IHBsdWdpbnMucS5kZWZlcigpO1xyXG4gICAgICAgIHJldHVybiBkb25lLnByb21pc2U7XHJcbiAgICB9O1xyXG4gICAgcmVtb3ZlUmVjb3JkKCl7XHJcbiAgICAgICAgbGV0IGRvbmUgPSBwbHVnaW5zLnEuZGVmZXIoKTtcclxuICAgICAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xyXG4gICAgfTtcclxuICAgIHVwZGF0ZVJlY29yZChkb21haW5OYW1lQXJnOnN0cmluZyx0eXBlQXJnOnN0cmluZyx2YWx1ZUFyZyl7XHJcbiAgICAgICAgbGV0IGRvbmUgPSBwbHVnaW5zLnEuZGVmZXIoKTtcclxuICAgICAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xyXG4gICAgfTtcclxuICAgIGxpc3RSZWNvcmRzKGRvbWFpbk5hbWU6c3RyaW5nKXtcclxuICAgICAgICBsZXQgZG9uZSA9IHBsdWdpbnMucS5kZWZlcigpO1xyXG4gICAgICAgIHRoaXMuZ2V0Wm9uZUlkKGRvbWFpbk5hbWUpXHJcbiAgICAgICAgICAgIC50aGVuKChkb21haW5JZEFyZyk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdChcIkdFVFwiLFwiL3pvbmVzL1wiICsgZG9tYWluSWRBcmcgKyBcIi9kbnNfcmVjb3Jkcz9wZXJfcGFnZT0xMDBcIilcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZUFyZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUucmVzb2x2ZShyZXNwb25zZUFyZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBkb25lLnByb21pc2U7XHJcbiAgICB9XHJcbiAgICBsaXN0Wm9uZXMoZG9tYWluTmFtZT86c3RyaW5nKXsgLy8gVE9ETzogaGFuZGxlIHBhZ2luYXRpb25cclxuICAgICAgICBsZXQgZG9uZSA9IHBsdWdpbnMucS5kZWZlcigpO1xyXG4gICAgICAgIGxldCByZXF1ZXN0Um91dGUgPSBcIi96b25lcz9wZXJfcGFnZT01MFwiXHJcbiAgICAgICAgaWYoZG9tYWluTmFtZSkgcmVxdWVzdFJvdXRlID0gcmVxdWVzdFJvdXRlICsgXCImbmFtZT1cIiArIGRvbWFpbk5hbWU7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9OyBcclxuICAgICAgICB0aGlzLnJlcXVlc3QoXCJHRVRcIixyZXF1ZXN0Um91dGUpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlQXJnKXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3BvbnNlQXJnO1xyXG4gICAgICAgICAgICAgICAgZG9uZS5yZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBkb25lLnByb21pc2U7XHJcbiAgICB9O1xyXG4gICAgcmVxdWVzdChtZXRob2RBcmc6c3RyaW5nLHJvdXRlQXJnOnN0cmluZyxqc29uQXJnPyl7XHJcbiAgICAgICAgbGV0IGRvbmUgPSBwbHVnaW5zLnEuZGVmZXIoKTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgbWV0aG9kOm1ldGhvZEFyZyxcclxuICAgICAgICAgICAgdXJsOlwiaHR0cHM6Ly9hcGkuY2xvdWRmbGFyZS5jb20vY2xpZW50L3Y0XCIgKyByb3V0ZUFyZyxcclxuICAgICAgICAgICAgaGVhZGVyczp7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOlwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICAgICAgXCJYLUF1dGgtRW1haWxcIjp0aGlzLmF1dGhFbWFpbCxcclxuICAgICAgICAgICAgICAgIFwiWC1BdXRoLUtleVwiOnRoaXMuYXV0aEtleVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBqc29uOmpzb25BcmdcclxuICAgICAgICB9O1xyXG4gICAgICAgIHBsdWdpbnMucmVxdWVzdChvcHRpb25zLGZ1bmN0aW9uKGVyciwgcmVzLCBib2R5KXtcclxuICAgICAgICAgICAgaWYgKCFlcnIgJiYgcmVzLnN0YXR1c0NvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2VPYmogPSBKU09OLnBhcnNlKGJvZHkpO1xyXG4gICAgICAgICAgICAgICAgZG9uZS5yZXNvbHZlKHJlc3BvbnNlT2JqKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgZG9uZS5yZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xyXG4gICAgfVxyXG59OyJdfQ==