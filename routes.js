const express = require('express')
const router = express.Router()
const fs = require('fs')

const data = require('./data.json')


// const yourCreation = {
//   head: req.body.
// }

router.get('/test/:idOne/:idTwo/:idThree', (req, res) => {
  let headImage = data.head.find(image => image.id ===  Number(req.params.idOne))
  let torsoImage = data.body.find(image => image.id === Number(req.params.idTwo))
  let legsImage = data.legs.find(image => image.id === Number(req.params.idThree))
  res.send({headImage, torsoImage, legsImage})
  // res.send(req.params)
})

router.get('/test', (req, res) => {
  let headImage = data.head.find(image => image.id ===  Number(req.query.head))
  let torsoImage = data.body.find(image => image.id === Number(req.query.torso))
  let legsImage = data.legs.find(image => image.id === Number(req.query.legs))
  res.send({headImage, torsoImage, legsImage})
  // res.send(req.params)
})


// router.post('/test', (req, res) => {
//   let fullBody = headImagetorsoImage.legsImage
//   res.send(fullBody)})
// router.get('/chimera/creation', function ())




// .find(image =>
//   image.id === Number(req.params.id))

router.get('/chimera', function (req, res) {
  fs.readFile('./data.json', function(err, data) {
    if (err) {
      return console.log('there was an error: ' + err)
    }

    res.render('layouts/main', data)

  })
})


router.get('/test/creation', (req, res) => {
  //find image head id
  let head_id = 1
  let body_id = 2
  let legs_id = 3
  //find image body id
  //find image legs id
  res.redirect(`/test/${head_id}/${body_id}/${legs_id}`)
})



router.get('/', function (req, res) {
  res.redirect('/chimera')
})

module.exports = router
