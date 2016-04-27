# cflare
allows you to manage multiple cloudflare accounts.

> Note: this package is still in alpha, so some things do not yet work.
I (Phil from Lossless) expect this package to be ready 1. of June 2016.

## Status
[![Build Status](https://travis-ci.org/pushrocks/cflare.svg?branch=master)](https://travis-ci.org/pushrocks/cflare)

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

### About the authors:
[![Project Phase](https://mediaserve.lossless.digital/lossless.com/img/createdby_github.svg)](https://lossless.com/)

[![Gitter](https://img.shields.io/badge/Support%20us-PayPal-blue.svg)](https://paypal.me/lossless)