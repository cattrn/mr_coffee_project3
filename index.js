// express setup
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// morgan setup
const morgan = require('morgan')
app.use(morgan('dev'))

// postgres setup
const db = require('./database')

// static files
const data = require('./public/data.js')
app.use(express.static('public'))

// password encryption
const crypto = require('crypto')

// port
const port = 3000

// pug template engine
app.set('views', './views')
app.set('view engine', 'pug')

// // VIEWS

app.get('/', (req, res) => {
  db.any('SELECT * from schedules;')
  .then((schedules) => {
    console.log(schedules)
    res.render('pages/index', {
      schedules: schedules
    })
  })
  .catch((err) => {
    res.render('pages/error', {
      err: err
    })
  })
})

app.get('/new', (req, res) => {
  res.render('pages/new')
})

// SCHEDULE POST
app.post('/schedules', (req, res) => {

  const weekTranslation = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7
  }

  const username = req.body.username
  const day = weekTranslation[req.body.day]
  const start_time = req.body.start_time
  const end_time = req.body.end_time

  db.query('INSERT INTO schedules(username, day, start_time, end_time) VALUES (?, ?, ?, ?)', [username, day, start_time, end_time])
  res.redirect('/new')
})



// // regex to limit parameter to numbers
// app.get('/users/:id(\\d+)/', (req, res) => {
//   res.render('user', {
//     users: data.users[req.params.id]
//   })
// })

// let personalSchedule = []
// app.get('/users/:id/schedules', (req, res) => {
//   for (i = 0; i < data.schedules.length; i++) {
//     if (data.schedules[i]['user_id'] == req.params.id) {
//       personalSchedule.push(data.schedules[i])
//     }
//   }
//   res.render('schedule', {
//     users: data.users[req.params.id],
//     schedules: personalSchedule
//   })
//   personalSchedule = []
// })

// app.get('/users/new', (req, res) => {
//   res.render('new-user')
// })

// // SCHEDULE FORM




// // USER FORM

// app.post('/users', (req, res) => {
//   const secret = 'abcdefg'
//   const hash = crypto.createHmac('sha256', secret).update(req.body.password).digest('hex')

//   let newUser = {
//     'firstname': req.body.firstname,
//     'lastname': req.body.lastname,
//     'email': req.body.email,
//     'password': hash
//   }
//   data.users.push(newUser)
//   res.redirect('/users')
// })



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})