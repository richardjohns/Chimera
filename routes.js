// routes

var express = require('express')
var router = express.Router()
const fs = require('fs')

var data = require('./data.json')

function readPuppyData (cb) {
  fs.readFile(__dirname + '/data.json', 'utf8', (err, data) => {
    if (err) console.log(err)
    else (cb(JSON.parse(data)))
  })
}

router.get('/', (req, res) => {
  readPuppyData((data) => {
    res.render('puppies/index', data)
  })
})

router.get('/puppies/rehome', (req, res) => {
  res.render('puppies/rehome')
})

router.get('/puppies/new', (req, res) => {
  res.render('puppies/new')
})

router.get('/puppies/:id', (req, res) => {
  readPuppyData((data) => {
    var showPuppies = data.puppies.find((showPuppies) => showPuppies.id == req.params.id)
    console.log(showPuppies)
    res.render('puppies/view', showPuppies)
  })
  // all 'this' triggered by id.
})

router.get('/puppies/edit/:id', (req, res) => {
  // console.log(data.puppies);
  readPuppyData((data) => {
    var editPuppies = data.puppies.find((editPuppies) => editPuppies.id == req.params.id)
    // console.log(findPic);
    res.render('puppies/edit', editPuppies)
  })

  // all 'this' triggered by id.
})

router.post('/puppies/edit/:id', (req, res) => {
  // var content
  // var newContent = data.puppies

  readPuppyData((data) => {
    var {name, breed, owner} = req.body // DON DID THIS!!!
    var puppyIndex = data.puppies.findIndex((puppy) => {
      return puppy.id === Number(req.params.id)
    })

    data.puppies[puppyIndex].name = name
    data.puppies[puppyIndex].breed = breed
    data.puppies[puppyIndex].owner = owner
    const puppiesString = JSON.stringify(data, null, 2)
    // stringify will sort spacing as 2 for one line, 4 for 2 lines, 6 for 3.

    // Need to stringify before using writefile as it performs the operation straight away.
    fs.writeFile(__dirname + '/data.json', puppiesString, (err) => {
      if (err) {
        console.log(err)
      } else {
        res.redirect('/puppies/' + req.params.id)
      }
    })
  })
})

router.post('/puppies/new', (req, res) => {
  // var {name, breed, owner} = req.body
  var newPuppy = req.body
  newPuppy.id = data.puppies.length + 1
  data.puppies.push(newPuppy)
  // console.log(data.puppies)
  const puppiesString = JSON.stringify(data, null, 2)

  fs.writeFile(__dirname + '/data.json', puppiesString, (err) => {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/puppies/' + newPuppy.id)
    }
  })
})

router.post('/puppies/rehome', (req, res) => {
  var delPuppyName = req.body.name
  console.log(delPuppyName)
  console.log(data.puppies)

  readPuppyData((data) => {
    var delPuppy = data.puppies.find((delPuppy) => req.body.name == data.puppies.name)
     // data.puppies.splice(delPuppy, 1)
    // console.log(data.puppies)

    const puppiesString = JSON.stringify(data, null, 2)

    fs.writeFile(__dirname + '/data.json', puppiesString, (err) => {
      if (err) {
        console.log(err)
      } else {
        res.redirect('/puppies/index')
      }
    })
  })
})

module.exports = router
