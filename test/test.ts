import 'typings-test'
import cflare = require('../dist/index')
import { expect } from 'smartchai'
import { Qenv } from 'qenv'
let testQenv = new Qenv(process.cwd(), process.cwd() + '/.nogit')
console.log(testQenv.missingEnvVars)
let testCflareAccount = new cflare.CflareAccount()
testCflareAccount.auth({
    email: process.env.CF_EMAIL,
    key: process.env.CF_KEY
})

let randomPrefix = Math.floor(Math.random() * 2000)

describe('cflare', function () {
    describe('.CflareAccount', function () {
        describe('.listZones()', function () {
            it('should display an entire account', function (done) {
                this.timeout(600000)
                testCflareAccount.listZones()
                    .then((responseArg) => {
                        done()
                    })
            })
        })
        describe('.getZoneId(domainName)', function () {
            it('should get an Cloudflare Id for a domain string', function (done) {
                this.timeout(600000)
                testCflareAccount.getZoneId('bleu.de')
                    .then((responseArg) => {
                        done()
                    })
            })
        })
        describe('.listRecords(domainName)', function () {
            it('should list all records for a specific Domain Name', function (done) {
                this.timeout(600000)
                testCflareAccount.listRecords('bleu.de')
                    .then((responseArg) => {
                        console.log(responseArg)
                        done()
                    })
            })
        })
        describe('.createRecord', function () {
            it('should create a valid record for a subdomain', function (done) {
                this.timeout(600000)
                testCflareAccount.createRecord(`${randomPrefix}subdomain.bleu.de`, 'A', '127.0.0.1')
                    .then(function (responseArg) {
                        done()
                    })
            })
        })
        describe('.getRecord', function () {
            it('should get a record from Cloudflare', function (done) {
                this.timeout(600000)
                testCflareAccount.getRecord('bleu.de', 'A')
                    .then(function (responseArg) {
                        console.log(responseArg)
                        done()
                    })
            })
        })
        describe('.removeRecord', function () {
            it('should remove a subdomain record from Cloudflare', function (done) {
                this.timeout(600000)
                testCflareAccount.removeRecord(`${randomPrefix}subdomain.bleu.de`, 'A')
                    .then(function (responseArg) {
                        console.log(responseArg)
                        done()
                    })
            })
        })
    })
})
