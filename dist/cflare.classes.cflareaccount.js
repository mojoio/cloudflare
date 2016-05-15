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
    CflareAccount.prototype.listRecords = function (domainName) {
        var done = plugins.q.defer();
        return done.promise;
    };
    CflareAccount.prototype.listDomains = function () {
        var done = plugins.q.defer();
        this.request("GET", "/zones")
            .then(function (responseArg) {
        });
        return done.promise;
    };
    ;
    CflareAccount.prototype.request = function (methodArg, routeArg) {
        var done = plugins.q.defer();
        var options = {
            method: methodArg,
            url: "https://api.cloudflare.com/client/v4" + routeArg,
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Email": this.authEmail,
                "X-Auth-Key": this.authKey
            }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNmbGFyZS5jbGFzc2VzLmNmbGFyZWFjY291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDRDQUE0QztBQUM1QyxJQUFPLE9BQU8sV0FBVyxrQkFBa0IsQ0FBQyxDQUFDO0FBRzdDO0lBTUk7SUFFQSxDQUFDO0lBTE8saUNBQVMsR0FBakI7UUFDSSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLDRCQUE0QjtJQUN6RSxDQUFDOztJQUlELDRCQUFJLEdBQUosVUFBSyxVQUFvQztRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDO0lBQ2xDLENBQUM7SUFDRCxvQ0FBWSxHQUFaO1FBQ0ksSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDOztJQUNELG9DQUFZLEdBQVo7UUFDSSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7O0lBQ0QsbUNBQVcsR0FBWCxVQUFZLFVBQWlCO1FBQ3pCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUNELG1DQUFXLEdBQVg7UUFDSSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLFFBQVEsQ0FBQzthQUN2QixJQUFJLENBQUMsVUFBUyxXQUFXO1FBRTFCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQzs7SUFDRCwrQkFBTyxHQUFQLFVBQVEsU0FBZ0IsRUFBQyxRQUFlO1FBQ3BDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsSUFBSSxPQUFPLEdBQUc7WUFDVixNQUFNLEVBQUMsU0FBUztZQUNoQixHQUFHLEVBQUMsc0NBQXNDLEdBQUcsUUFBUTtZQUNyRCxPQUFPLEVBQUM7Z0JBQ0osY0FBYyxFQUFDLGtCQUFrQjtnQkFDakMsY0FBYyxFQUFDLElBQUksQ0FBQyxTQUFTO2dCQUM3QixZQUFZLEVBQUMsSUFBSSxDQUFDLE9BQU87YUFDNUI7U0FDSixDQUFBO1FBQ0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUMsVUFBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7WUFDM0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzlCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLENBQUM7WUFBQSxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQXpEQSxBQXlEQyxJQUFBO0FBekRZLHFCQUFhLGdCQXlEekIsQ0FBQTtBQUFBLENBQUMiLCJmaWxlIjoiY2ZsYXJlLmNsYXNzZXMuY2ZsYXJlYWNjb3VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3R5cGluZ3MvbWFpbi5kLnRzXCIgLz5cclxuaW1wb3J0IHBsdWdpbnMgPSByZXF1aXJlKFwiLi9jZmxhcmUucGx1Z2luc1wiKTtcclxuaW1wb3J0IGhlbHBlcnMgPSByZXF1aXJlKFwiLi9jZmxhcmUuY2xhc3Nlcy5oZWxwZXJzXCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIENmbGFyZUFjY291bnQge1xyXG4gICAgcHJpdmF0ZSBhdXRoRW1haWw6c3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBhdXRoS2V5OnN0cmluZztcclxuICAgIHByaXZhdGUgYXV0aENoZWNrKCl7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmF1dGhFbWFpbCAmJiB0aGlzLmF1dGhLZXkpOyAvL2NoZWNrIGlmIGF1dGggaXMgYXZhaWxhYmxlXHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIFxyXG4gICAgfTtcclxuICAgIGF1dGgob3B0aW9uc0FyZzp7ZW1haWw6c3RyaW5nLGtleTpzdHJpbmd9KXtcclxuICAgICAgICB0aGlzLmF1dGhFbWFpbCA9IG9wdGlvbnNBcmcuZW1haWw7XHJcbiAgICAgICAgdGhpcy5hdXRoS2V5ID0gb3B0aW9uc0FyZy5rZXk7ICAgICAgIFxyXG4gICAgfVxyXG4gICAgY3JlYXRlUmVjb3JkKCl7XHJcbiAgICAgICAgbGV0IGRvbmUgPSBwbHVnaW5zLnEuZGVmZXIoKTtcclxuICAgICAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xyXG4gICAgfTtcclxuICAgIHJlbW92ZVJlY29yZCgpe1xyXG4gICAgICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XHJcbiAgICAgICAgcmV0dXJuIGRvbmUucHJvbWlzZTtcclxuICAgIH07XHJcbiAgICBsaXN0UmVjb3Jkcyhkb21haW5OYW1lOnN0cmluZyl7XHJcbiAgICAgICAgbGV0IGRvbmUgPSBwbHVnaW5zLnEuZGVmZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xyXG4gICAgfVxyXG4gICAgbGlzdERvbWFpbnMoKXtcclxuICAgICAgICBsZXQgZG9uZSA9IHBsdWdpbnMucS5kZWZlcigpO1xyXG4gICAgICAgIHRoaXMucmVxdWVzdChcIkdFVFwiLFwiL3pvbmVzXCIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlQXJnKXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xyXG4gICAgfTtcclxuICAgIHJlcXVlc3QobWV0aG9kQXJnOnN0cmluZyxyb3V0ZUFyZzpzdHJpbmcpe1xyXG4gICAgICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIG1ldGhvZDptZXRob2RBcmcsXHJcbiAgICAgICAgICAgIHVybDpcImh0dHBzOi8vYXBpLmNsb3VkZmxhcmUuY29tL2NsaWVudC92NFwiICsgcm91dGVBcmcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjpcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgICAgIFwiWC1BdXRoLUVtYWlsXCI6dGhpcy5hdXRoRW1haWwsXHJcbiAgICAgICAgICAgICAgICBcIlgtQXV0aC1LZXlcIjp0aGlzLmF1dGhLZXlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwbHVnaW5zLnJlcXVlc3Qob3B0aW9ucyxmdW5jdGlvbihlcnIsIHJlcywgYm9keSl7XHJcbiAgICAgICAgICAgIGlmICghZXJyICYmIHJlcy5zdGF0dXNDb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlT2JqID0gSlNPTi5wYXJzZShib2R5KTtcclxuICAgICAgICAgICAgICAgIGRvbmUucmVzb2x2ZShyZXNwb25zZU9iaik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgIGRvbmUucmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRvbmUucHJvbWlzZTtcclxuICAgIH1cclxufTsiXX0=
