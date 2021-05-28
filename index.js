// express setup
const express = require('express')
const app = express()

// look for static files in 'public' folder
app.use(express.static('public'))

// postgres setup
const db = require('./database')

// bcrypt setup
const bcrypt = require('bcrypt')
const saltRounds = 10

// set port to 3000 unless there's an environmental variable for PORT
const PORT = process.env.PORT || 3000

// access to our data.js file
const data = require('./data')

// body parsing
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// set view engine
app.set('view engine', 'ejs')

// Step 2
app.get('/', (req, res) => {
  db.any('SELECT * FROM schedules;')
  .then((schedules) => {
    console.log(schedules)
    res.render('pages/index', {
      documentTitle: 'Homepage',
      name: 'Cat',
      day: 'Friday',
      schedules: schedules
      // usersLength: data.users.length
    })
  })
  .catch((err) => {
    res.send(err)
  })
})

app.get('/users', (req, res) => {
  res.send(data.users)
})


// Step 3
app.get('/users/:id', (req, res) => {
  const object = Number(req.params.id)
  console.log(object)
  res.send(data.users[object])
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

  // bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
  //   // Store hash in your password DB.
  //   console.log(hash)
  //   return hash
  // })
  

  const hash = bcrypt.hashSync(plainTextPassword, saltRounds);
  console.log(hash)
  res.send(hash)
})

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})