const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

// access to our data.js file
const data = require('./data')

// Step 2
app.get('/', (req, res) => {
  console.log(data)
  res.send("Welcome to our schedule website")
})

app.get('/users', (req, res) => {
  res.send(data.users)
})


// Step 3
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



app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})