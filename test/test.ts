import { expect, tap } from '@pushrocks/tapbundle';
import cloudflare = require('../ts/index');
import { Qenv } from '@pushrocks/qenv';
const testQenv = new Qenv(process.cwd(), process.cwd() + '/.nogit');

const testCloudflareAccount = new cloudflare.CloudflareAccount();
testCloudflareAccount.auth({
  email: testQenv.getEnvVarOnDemand('CF_EMAIL'),
  key: testQenv.getEnvVarOnDemand('CF_KEY')
});

const randomPrefix = Math.floor(Math.random() * 2000);

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

tap.start();
