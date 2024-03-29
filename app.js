const express = require('express')

const app = express()
app.use(express.json());

const port = process.env.PORT || 8080;
const m = require('./module.js');
const db = require('./db.js');

var validateInput = m.validateInput;
var isMutant = m.isMutant;

/*
    Function to verify the default port of the server
*/
app.get('/', (req, res) => {
    res.send('Mutant Inspector Server Running!')
})

/*
    Function to verify if a dna is a mutant or not.
    200 http code is mutant
    403 http code if human
*/
app.post('/mutant', function(req, res) {
    try {
        var input = req.body.dna;
        var array = validateInput(input);
        var matriz = array.map(function(str) {
            return [...str];
        });
        var result = isMutant(matriz);


        /* Insert to database */
        db.query('INSERT INTO verifications (input, is_mutant) VALUES ($1, $2)', [JSON.stringify(input), result], (error, results) => {})

        return result ?
            res.sendStatus(200) :
            res.sendStatus(403)
    } catch (err) {
        res.status(500).send({
            message: err
        });
    }
});

/*
    Function to retrieve statistics
*/
app.get('/stats', function(req, res) {
    try {
        var sql = `select 
                  SUM(CASE WHEN verifications.is_mutant = true THEN 1 ELSE 0 END) AS count_mutant_dna, 
                  SUM(CASE WHEN verifications.is_mutant = false THEN 1 ELSE 0 END) AS count_human_dna 
               from public.verifications`;
        db.query(sql, (error, result) => {
            var row = result.rows[0];
            var total = row.count_mutant_dna + row.count_human_dna;
            var ratio = row.count_mutant_dna / total;
            res.json({
                "message": "success",
                "data": {
                    "count_mutant_dna": row.count_mutant_dna,
                    "count_human_dna": row.count_human_dna,
                    "ratio": ratio
                }
            })
        });
    } catch (err) {
        res.status(500).send({
            message: err
        });
    }
});


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

module.exports = app;