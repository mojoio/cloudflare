# cflare

easy cloudflare management

## Availabililty

[![npm](https://mojoio.gitlab.io/assets/repo-button-npm.svg)](https://www.npmjs.com/package/cflare)
[![git](https://mojoio.gitlab.io/assets/repo-button-git.svg)](https://GitLab.com/mojoio/cflare)
[![git](https://mojoio.gitlab.io/assets/repo-button-mirror.svg)](https://github.com/mojoio/cflare)
[![docs](https://mojoio.gitlab.io/assets/repo-button-docs.svg)](https://mojoio.gitlab.io/cflare/)

## Status for master

[![build status](https://GitLab.com/mojoio/cflare/badges/master/build.svg)](https://GitLab.com/mojoio/cflare/commits/master)
[![coverage report](https://GitLab.com/mojoio/cflare/badges/master/coverage.svg)](https://GitLab.com/mojoio/cflare/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/cflare.svg)](https://www.npmjs.com/package/cflare)
[![Dependency Status](https://david-dm.org/mojoio/cflare.svg)](https://david-dm.org/mojoio/cflare)
[![bitHound Dependencies](https://www.bithound.io/github/mojoio/cflare/badges/dependencies.svg)](https://www.bithound.io/github/mojoio/cflare/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/mojoio/cflare/badges/code.svg)](https://www.bithound.io/github/mojoio/cflare)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Usage

Use TypeScript for best in class instellisense.

```javascript
import * as cflare from 'cflare'

let myCflareAccount = new cflare.CflareAccount()
testCflareAccount.auth({
    email: 'someuser@example.com',
    key: 'someLongApiKey'
})

let myAsyncCflareManagement = async () => {
    // get things
    let myZones = await myCflareAccount.listZones() // zones are fully typed
    let myIdForADomain = await myCflareAccount.getZoneId('example.com') // type number
    let myRecordsForADomain = await myCflareAccount.listRecords('example.com') // records are fully typed

    // set things
    myCflareAccount.updateRecord(...)
    myCflareAccount.createRecord(...)
    myCflareAccount.deleteRecord(...)
}
```

For further information read the linked docs at the top of this README.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)

[![repo-footer](https://mojoio.gitlab.io/assets/repo-footer.svg)](https://mojo.io)
