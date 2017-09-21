// routes

var express = require('express')
var router = express.Router()

var data = require('./data.json')

router.get('/', (req, res) => {
  res.send('hello')
})

module.exports = router
