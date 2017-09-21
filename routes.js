// routes

var express = require('express')
var router = express.Router()
const fs = require('fs')

var data = require('./data.json')

router.get('/', (req, res) => {
  res.redirect('/chimera')
})


router.get('/chimera', function (req, res) {
  fs.readFile('./data.json', function(err, data) {
    if (err) {
      return console.log('there was an error: ' + err)
    }

    res.render('chimera/index', data)

  })
})



module.exports = router
