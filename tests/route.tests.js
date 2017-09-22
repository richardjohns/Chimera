var test = require('tape')
var request = require('supertest')
var cheerio = require('cheerio')

var server = require('../server')
var data = require('../data')

test('lets get this baby working', t => {
  t.pass()
  t.end()
})
