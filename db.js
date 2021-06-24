const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: '34.122.156.41',
    database: 'mutants',
    password: '9pjmyMsIkbAedAOu',
    port: 5432,
})

module.exports = pool;