# cflare
easy cloudflare management

## Availabililty
[![npm](https://push.rocks/assets/repo-button-npm.svg)](https://www.npmjs.com/package/cflare)
[![git](https://push.rocks/assets/repo-button-git.svg)](https://GitLab.com/pushrocks/cflare)
[![git](https://push.rocks/assets/repo-button-mirror.svg)](https://github.com/pushrocks/cflare)
[![docs](https://push.rocks/assets/repo-button-docs.svg)](https://pushrocks.gitlab.io/cflare/)

## Status for master
[![build status](https://GitLab.com/pushrocks/cflare/badges/master/build.svg)](https://GitLab.com/pushrocks/cflare/commits/master)
[![coverage report](https://GitLab.com/pushrocks/cflare/badges/master/coverage.svg)](https://GitLab.com/pushrocks/cflare/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/cflare.svg)](https://www.npmjs.com/package/cflare)
[![Dependency Status](https://david-dm.org/pushrocks/cflare.svg)](https://david-dm.org/pushrocks/cflare)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/cflare/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/cflare/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/cflare/badges/code.svg)](https://www.bithound.io/github/pushrocks/cflare)
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

[![npm](https://push.rocks/assets/repo-header.svg)](https://push.rocks)
