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

router.get('/view', function (req, res){
  let db = req.app.get('db')
  db("wombles")
  .select('name','description')
  .join('characteristics','wombles.characteristic_id','=','characteristics.id')
  .then((results)=> {
    res.render('view', {wombles:results})
  })
})

router.get('/view/:id', function (req,res) {
  let id = req.params.id
  let db = req.app.get('db')
  db("wombles")
  .select('name','description')
  .join('characteristics','wombles.characteristic_id','=','characteristics.id')
  .where('wombles.id', id)
  .then((results)=> {
    res.render('view', {wombles:results})
  })
})

router.get('/add', function (req, res) {
  res.render('add')
})

router.post('/add', function (req, res) {
   var wombleName = req.body.wombleName
   var character = req.body.characteristics
   console.log(wombleName)
   //res.send(wombleName);

  //  let db = req.app.get('db')
  //  db("wombles")
  //   .insert
})



module.exports = router
