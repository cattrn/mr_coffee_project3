const express = require('express')
const data = require('./public/data.js')
const crypto = require('crypto')

const app = express()
const port = 3000

// I don't know how these work
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(express.static('public'))

// pug template engine
app.set('views', './views')
app.set('view engine', 'pug')

// ROUTES
app.get('/', (req, res) => {
  res.render('index', {
    description: 'Welcome to our schedule website'
  })
})

app.get('/users', (req, res) => {
  res.render('users', {
    users: data.users
  })
})

app.get('/schedules', (req, res) => {
  res.render('schedules', {
    schedules: data.schedules
  })
})

app.get('/users/:id(\\d+)/', (req, res) => {
  res.render('user', {
    users: data.users[req.params.id]
  })
})

let personalSchedule = []
app.get('/users/:id/schedules', (req, res) => {
  for (i = 0; i < data.schedules.length; i++) {
    if (data.schedules[i]['user_id'] == req.params.id) {
      personalSchedule.push(data.schedules[i])
    }
  }
  res.render('schedule', {
    users: data.users[req.params.id],
    schedules: personalSchedule
  })
  personalSchedule = []
})

app.get('/users/new', (req, res) => {
  res.render('new-user')
})

app.get('/schedules/new', (req, res) => {
  res.render('new-schedule')
})

// STEP 4 --------------------------------//

// app.post('/schedules', (req, res) => {
//   let newSchedule = {
//     'user_id': Number(req.body.user_id),
//     'day': Number(req.body.day),
//     'start_at': req.body.start_at,
//     'end_at': req.body.end_at
//   }

//   data.schedules.push(newSchedule)
//   res.send(newSchedule)
// })




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
//   res.send(newUser)
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})