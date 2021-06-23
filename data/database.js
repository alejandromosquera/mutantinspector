var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE verifications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data text, 
            is_mutant bool,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`,
            (err) => {
                if (err) {
                    // Table already created
                }
            });
    }
});


module.exports = db