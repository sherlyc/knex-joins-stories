var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.redirect('/list')
})

router.get('/list', function (req,res){
  let db = req.app.get('db')
  db("wombles")
  .then((results) => {
    res.render('lists', {wombles:results})
  })
})

module.exports = router
