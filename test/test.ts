/// <reference path="../ts/typings/main.d.ts" />
import cflare = require("../dist/index");
let nogit = require("../nogit/nogit.json");

let testCflareAccount = new cflare.CflareAccount();
testCflareAccount.auth({
    email: nogit.cfemail,
    key: nogit.cfkey
});

