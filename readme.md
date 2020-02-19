# @mojoio/cloudflare
easy cloudflare management

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/@mojoio/cloudflare)
* [gitlab.com (source)](https://gitlab.com/mojoio/cloudflare)
* [github.com (source mirror)](https://github.com/mojoio/cloudflare)
* [docs (typedoc)](https://mojoio.gitlab.io/cloudflare/)

## Status for master
[![pipeline status](https://gitlab.com/mojoio/cloudflare/badges/master/pipeline.svg)](https://gitlab.com/mojoio/cloudflare/commits/master)
[![coverage report](https://gitlab.com/mojoio/cloudflare/badges/master/coverage.svg)](https://gitlab.com/mojoio/cloudflare/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/@mojoio/cloudflare.svg)](https://www.npmjs.com/package/@mojoio/cloudflare)
[![Known Vulnerabilities](https://snyk.io/test/npm/@mojoio/cloudflare/badge.svg)](https://snyk.io/test/npm/@mojoio/cloudflare)
[![TypeScript](https://img.shields.io/badge/TypeScript->=%203.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)

## Usage

Use TypeScript for best in class instellisense.

```javascript
import * as cflare from '@mojoio/cloudflare';

const myCflareAccount = new cflare.CflareAccount('mySuperAwesomeAccountToken');

const myAsyncCflareManagement = async () => {
  // get things
  const myZones = await myCflareAccount.listZones(); // zones are fully typed
  const myIdForADomain = await myCflareAccount.getZoneId('example.com'); // type number
  const myRecordsForADomain = await myCflareAccount.listRecords('example.com'); // records are fully typed
};
```

## Contribution

We are always happy for code contributions. If you are not the code contributing type that is ok. Still, maintaining Open Source repositories takes considerable time and thought. If you like the quality of what we do and our modules are useful to you we would appreciate a little monthly contribution: You can [contribute one time](https://lossless.link/contribute-onetime) or [contribute monthly](https://lossless.link/contribute). :)

For further information read the linked docs at the top of this readme.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy)

[![repo-footer](https://lossless.gitlab.io/publicrelations/repofooter.svg)](https://maintainedby.lossless.com)
