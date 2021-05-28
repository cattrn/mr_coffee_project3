const pgp = require('pg-promise')()

const user = 'caterinaturnbull'
const password = '12345678'
const host = 'localhost'
const pgPort = 5432
const database = 'coffeemr'

const connection = `postgres://${user}:${password}@${host}:${pgPort}/${database}`

const db = pgp(connection)

module.exports = db