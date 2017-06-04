import { expect, tap } from 'tapbundle'
import cflare = require('../dist/index')
import { Qenv } from 'qenv'
let testQenv = new Qenv(process.cwd(), process.cwd() + '/.nogit')
console.log(testQenv.missingEnvVars)
let testCflareAccount = new cflare.CflareAccount()
testCflareAccount.auth({
  email: process.env.CF_EMAIL,
  key: process.env.CF_KEY
})

let randomPrefix = Math.floor(Math.random() * 2000)

tap.test('.listZones() -> should display an entire account', async (tools) => {
  // tools.timeout(600000)
  let result = await testCflareAccount.listZones()
  console.log(result)
})

tap.test('.getZoneId(domainName) -> should get an Cloudflare Id for a domain string', async (tools) => {
  // tools.timeout(600000)
  await testCflareAccount.getZoneId('bleu.de')
})

tap.test('.listRecords(domainName) -> should list all records for a specific Domain Name', async (tools) => {
  // tools.timeout(600000)
  await testCflareAccount.listRecords('bleu.de')
    .then(async (responseArg) => {
      console.log(responseArg)
    })
})

tap.test('should create a valid record for a subdomain', async (tools) => {
  // tools.timeout(600000)
  await testCflareAccount.createRecord(`${randomPrefix}subdomain.bleu.de`, 'A', '127.0.0.1')
})

tap.test('should get a record from Cloudflare', async (tools) => {
  // tools.timeout(600000)
  await testCflareAccount.getRecord('bleu.de', 'A')
    .then(function (responseArg) {
      console.log(responseArg)
    })
})

tap.test('should remove a subdomain record from Cloudflare', async (tools) => {
  // tools.timeout(600000)
  await testCflareAccount.removeRecord(`${randomPrefix}subdomain.bleu.de`, 'A')
    .then(async (responseArg) => {
      console.log(responseArg)
    })
})

tap.start()
