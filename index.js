const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')

const data = require('./data.js')

const app = express()
const port = 3000

// STEP 2 --------------------------------//

app.get('/', (req, res) => {
  res.send('Welcome to our schedule website')
})


app.get('/users', (req, res) => {
  res.send(data.users)
})

app.get('/schedules', (req, res) => {
  res.send(data.schedules)
})

// STEP 3 --------------------------------//

app.get('/users/:id', (req, res) => {
  res.send(data.users[req.params.id])
})

let personalSchedule = []
app.get('/users/:id/schedules', (req, res) => {
  for (i = 0; i < data.schedules.length; i++) {
    if (data.schedules[i]['user_id'] == req.params.id) {
      personalSchedule.push(data.schedules[i])
    }
  }
  res.send(personalSchedule)
  personalSchedule = []
})

// STEP 4 --------------------------------//

// don't know what this does
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())

// // Parse URL-encoded bodies (as sent by HTML forms)
// app.use(express.urlencoded());

// // Parse JSON bodies (as sent by API clients)
// app.use(express.json());



app.post('/schedules', (req, res) => {
  let newSchedule = {
    'user_id': Number(req.body.user_id),
    'day': Number(req.body.day),
    'start_at': req.body.start_at,
    'end_at': req.body.end_at
  }

  data.schedules.push(newSchedule)
  res.send(newSchedule)
})


app.post('/users', (req, res) => {
  const secret = 'abcdefg'
  const hash = crypto.createHmac('sha256', secret).update(req.body.password).digest('hex')

  let newUser = {
    'firstname': req.body.firstname,
    'lastname': req.body.firstname,
    'email': req.body.email,
    'password': hash
  }
  
  data.users.push(newUser)
  res.send(newUser)
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})