# cflare
allows you to manage cloudflare from CoreOS 

> Note: this package is still in alpha, so some things do not yet work.
I (Phil from Lossless) expect this package to be ready 1. of June 2016.

## Status

## Usage

```javascript
var cflare = require("cflare");
var cflareInstance = new cflare();

cflareInstance.auth({
    email:"",
    key:""
});

cflareInstance.createRecord();
cflareInstance.removeRecord();
cflareInstance.copyRecord();
cflareInstance.listRecords();
cflareInstance.listDomains();
```