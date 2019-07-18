// tslint:disable-next-line: no-implicit-dependencies
import { expect, tap } from '@pushrocks/tapbundle';
// tslint:disable-next-line: no-implicit-dependencies
import { Qenv } from '@pushrocks/qenv';

import cloudflare = require('../ts/index');

const testQenv = new Qenv(process.cwd(), process.cwd() + '/.nogit');

const randomPrefix = Math.floor(Math.random() * 2000);
let testCloudflareAccount: cloudflare.CloudflareAccount;

tap.test('should create a valid instance of CloudflareAccount', async () => {
  testCloudflareAccount = new cloudflare.CloudflareAccount({
    email: testQenv.getEnvVarOnDemand('CF_EMAIL'),
    key: testQenv.getEnvVarOnDemand('CF_KEY')
  });
});



tap.skip.test('.listZones() -> should display an entire account', async tools => {
  tools.timeout(600000);
  const result = await testCloudflareAccount.listZones();
  console.log(result);
});

tap.test(
  '.getZoneId(domainName) -> should get an Cloudflare Id for a domain string',
  async tools => {
    tools.timeout(600000);
    await testCloudflareAccount.getZoneId('bleu.de');
  }
);

tap.test(
  '.listRecords(domainName) -> should list all records for a specific Domain Name',
  async tools => {
    tools.timeout(600000);
    await testCloudflareAccount.listRecords('bleu.de').then(async responseArg => {
      console.log(responseArg);
    });
  }
);

tap.test('should create a valid record for a subdomain', async tools => {
  tools.timeout(600000);
  await testCloudflareAccount.createRecord(`${randomPrefix}subdomain.bleu.de`, 'A', '127.0.0.1');
});

tap.test('should get a record from Cloudflare', async tools => {
  tools.timeout(600000);
  await testCloudflareAccount.getRecord(`${randomPrefix}subdomain.bleu.de`, 'A').then(responseArg => {
    console.log(responseArg);
  });
});

tap.test('should remove a subdomain record from Cloudflare', async tools => {
  tools.timeout(600000);
  await testCloudflareAccount
    .removeRecord(`${randomPrefix}subdomain.bleu.de`, 'A')
    .then(async responseArg => {
      console.log(responseArg);
    });
});

tap.test('.purge(some.domain) -> should purge everything', async () => {
  await testCloudflareAccount.purgeZone('bleu.de');
});

// WORKERS
tap.test('should create a worker', async () => {
  const worker = await testCloudflareAccount.workerManager.createWorker('myawesomescript', `addEventListener('fetch', event => { event.respondWith(fetch(event.request)) })`);
  await worker.setRoutes([
    {
      zoneName: 'bleu.de',
      pattern: 'https://*bleu.de/hello'
    }
  ]);
  console.log(worker);
});

tap.test('should get workers', async () => {
  const workerArray = await testCloudflareAccount.workerManager.listWorkers();
  console.log(workerArray);
});

tap.start();
