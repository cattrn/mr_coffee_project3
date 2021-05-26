const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const saltRounds = 10

const PORT = process.env.PORT || 3000

// access to our data.js file
const data = require('./data')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// set view engine
app.set('view engine', 'ejs')

// Step 2
app.get('/', (req, res) => {
  // console.log(data)
  // res.send("Welcome to our schedule website")

  res.render('pages/index', {
    documentTitle: 'Homepage',
    name: 'Caterina Turnbull',
    day: 'Wednesday',
    users: data.users
    // usersLength: data.users.length
  })
})

app.get('/users', (req, res) => {
  res.send(data.users)
})


// Step 3
app.get('/users/:id', (req, res) => {
  res.send(data.users)
})

app.get('/users/:id/schedules', (req, res) => { // TODO: change id param to only digits
  const id = Number(req.params.id)
  let schedules = []

  for (let i = 0; i < data.schedules.length; i++) {
    let currentSchedule = data.schedules[i]
    if (currentSchedule.user_id === id) {
      schedules.push(currentSchedule)
    }
  }

  res.send(schedules)
})

// Step 4

app.post('/schedules', (req, res) => {
  data.schedules.push(req.body)
  console.log(req.body)
  res.send(req.body)
})

app.post('/users', (req, res) => {
  const plainTextPassword = req.body.password
  console.log(plainTextPassword)

  bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
    // Store hash in your password DB.
    console.log(err)
    console.log(hash)
  })

  res.send('Just testing')
})

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})