const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    /* On Google App Engine */
    host: '/cloudsql/mutant-inspector:us-central1:mutants',
    /* On Localhost */
    //host: '34.122.156.41',
    database: 'mutants',
    password: '9pjmyMsIkbAedAOu',
    port: 5432,
})

module.exports = pool;