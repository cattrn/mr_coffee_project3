// express setup
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// morgan setup
const morgan = require('morgan')
app.use(morgan('dev'))

// mysql setup
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'mrCoffee'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

// // files
// const data = require('./public/data.js')
// app.use(express.static('public'))

// // password encryption
// const crypto = require('crypto')

// port
const port = 3000

// // pug template engine
// app.set('views', './views')
// app.set('view engine', 'pug')

// // VIEWS

// app.get('/', (req, res) => {
//   res.render('index', {
//     description: 'Welcome to our schedule website'
//   })
// })

// app.get('/users', (req, res) => {
//   res.render('users', {
//     users: data.users
//   })
// })

// app.get('/schedules', (req, res) => {
//   res.render('schedules', {
//     schedules: data.schedules
//   })
// })

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

// app.get('/schedules/new', (req, res) => {
//   res.render('new-schedule', {
//     users: data.users
//   })
// })

// // SCHEDULE FORM

// app.post('/schedules', (req, res) => {
//   let user_id = Number
//   for (i = 0; i < data.users.length; i++) {
//     if (req.body.name == data.users[i]['firstname'] + ' ' + data.users[i]['lastname']) {
//       user_id = i
//     }
//   }

//   const weekTranslation = {
//     Monday: 1,
//     Tuesday: 2,
//     Wednesday: 3,
//     Thursday: 4,
//     Friday: 5,
//     Saturday: 6,
//     Sunday: 7
//   }

//   let newSchedule = {
//     'user_id': user_id,
//     'day': weekTranslation[req.body.day],
//     'start_at': req.body.start_at,
//     'end_at': req.body.end_at
//   }

//   data.schedules.push(newSchedule)
//   res.redirect('/schedules')
// })


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