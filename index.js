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
app.use(express.static('public'))

// port
const port = 3000

// pug template engine
app.set('views', './views')
app.set('view engine', 'pug')

// VIEWS

app.get('/', (req, res) => {
  db.any('SELECT * from schedules;')
  .then((schedules) => {
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

// NEW SCHEDULE POST

app.post('/new', (req, res) => {

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

  db.query('INSERT INTO schedules(username, day, start_time, end_time) VALUES ($1, $2, $3, $4)', [username, day, start_time, end_time])
  .then((newSchedule) => {
    console.log(newSchedule)
    res.redirect('/new')
  })
  .catch((err) => {
    res.render('pages/error', {
      err: err
    })
  });
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})