const express = require('express')
const morgan = require('morgan')
const data = require('./public/data.js')
const crypto = require('crypto')

const app = express()
const port = 3000

// I don't know how these work
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(morgan('dev'))

app.use(express.static('public'))

// pug template engine
// app.set('views', './views') //this is actually not needed
app.set('view engine', 'pug')

// VIEWS

app.get('/', (req, res) => {
  res.render('pages/index', {
    description: 'Welcome to our schedule website'
  })
})

app.get('/users', (req, res) => {
  res.render('pages/users', {
    users: data.users
  })
})

app.get('/schedules', (req, res) => {
  res.render('pages/schedules', {
    schedules: data.schedules
  })
})

// regex to limit parameter to numbers
app.get('/users/:id(\\d+)/', (req, res) => {
  res.render('pages/user', {
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
  res.render('pages/schedule', {
    users: data.users[req.params.id],
    schedules: personalSchedule
  })
  personalSchedule = []
})

app.get('/users/new', (req, res) => {
  res.render('pages/new-user')
})

app.get('/schedules/new', (req, res) => {
  res.render('pages/new-schedule', {
    users: data.users
  })
})

// SCHEDULE FORM

app.post('/schedules', (req, res) => {
  let user_id = Number
  for (i = 0; i < data.users.length; i++) {
    if (req.body.name == data.users[i]['firstname'] + ' ' + data.users[i]['lastname']) {
      user_id = i
    }
  }

  const weekTranslation = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7
  }

  const newSchedule = {
    'user_id': user_id,
    'day': weekTranslation[req.body.day],
    'start_at': req.body.start_at,
    'end_at': req.body.end_at
  }

  data.schedules.push(newSchedule)
  res.redirect('/schedules')
})


// USER FORM

// TODO: check if email exists already
app.post('/users', (req, res) => {
  const secret = 'abcdefg'
  const hash = crypto.createHmac('sha256', secret).update(req.body.password).digest('hex')

  const newUser = {
    'firstname': req.body.firstname,
    'lastname': req.body.lastname,
    'email': req.body.email,
    'password': hash
  }
  data.users.push(newUser)
  res.redirect('/users')
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})