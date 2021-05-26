const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

// access to our data.js file
const data = require('./data')

app.get('/', (req, res) => {
  res.send('Welcome to our schedule website')
})

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})