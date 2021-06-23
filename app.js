const express = require('express')

const app = express()
app.use(express.json());

const port = 8080
const m = require('./module.js');
const db = require("./data/database.js")

var validateInput = m.validateInput;
var isMutant = m.isMutant;


app.get('/', (req, res) => {
    res.send('Mutant Inspector Server Running!')
})

app.post('/mutant', function(req, res) {
    try {
        var input = req.body.dna;
        var array = validateInput(input);
        var matriz = array.map(function(str) {
            return [...str];
        });
        var result = isMutant(matriz);


        /* Insert to database */
        var data = {
            data: JSON.stringify(input),
            is_mutant: result
        }

        var sql = 'INSERT INTO verifications (data, is_mutant) VALUES (?,?)'
        var params = [data.data, data.is_mutant]
        db.run(sql, params, function(err, result) {
            console.log(err);
        });

        return isMutant ?
            res.sendStatus(200) :
            res.sendStatus(400)
    } catch (err) {
        res.status(500).send({
            message: err
        });
    }
});

app.get('/stats', function(req, res) {
    var sql = "select SUM(CASE WHEN is_mutant = 1 THEN 1 ELSE 0 END) AS count_mutant_dna, SUM(CASE WHEN is_mutant = 0 THEN 1 ELSE 0 END) AS count_human_dna from verifications"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        var row = rows[0];
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
});


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})