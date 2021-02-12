const pgp = require('pg-promise')()

// TODO: require password
const connection = 'postgres://caterinaturnbull:12345678@localhost:5432/mrcoffee'

const db = pgp(connection)

module.exports = db