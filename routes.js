var express = require('express')
var router = express.Router()

router.get('/', function (req, res) { //home that redirects to list
  res.redirect('/list')
})

router.get('/list', function (req,res){ //list all wombles
  let db = req.app.get('db')
  db("wombles")
  .then((results) => {
    res.render('lists', {wombles:results})
  })
})

router.get('/view', function (req, res){ //view all wombles characteristics
  let db = req.app.get('db')
  db("wombles")
  .select('name','description')
  .join('characteristics','wombles.characteristic_id','=','characteristics.id')
  .then((results)=> {
    res.render('view', {wombles:results})
  })
})

router.get('/view/:id', function (req,res) { //view a womble by id
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

router.get('/assignments', function (req, res) { //view rubbish assignments for each womble
  let db = req.app.get('db')
  db("wombles")
    .select('wombles.id','wombles.name', 'rubbish.name as rubbish')
    .join('rubbish', 'wombles.rubbish_id', '=', 'rubbish.id')
  .then((result) => {
    res.render('assignments', {wombles:result})
  })
})

router.get('/add', function (req, res) { //render an add form
  res.render('add')
})

router.post('/add', function (req, res) { //handle the add womble to db, might move it into functions
   var wombleName = req.body.wombleName
   var character = req.body.characteristics
   let db = req.app.get('db')
   db("wombles")
     .insert({
       name: wombleName,
       characteristic_id: character
     })
     .then((result) => {
       res.redirect('/view')
     })
})

router.get('/delete/:id', function (req, res) {
    let wombleID = req.params.id
    console.log(wombleID)
    let db = req.app.get('db')
    db("wombles")
      .where('id', wombleID)
      .del()
      .then((result) =>{
        res.redirect('/list')
      })
})

router.get('/edit/:id', function (req, res){
  let id = req.params.id
  let db = req.app.get('db')
  db("wombles")
    .select('wombles.id','name','description')
    .join('characteristics','wombles.characteristic_id','=','characteristics.id')
    .where('wombles.id', id)
  .then((result)=> {
    console.log(result)
    res.render('edit', result[0])
  })
})



module.exports = router
