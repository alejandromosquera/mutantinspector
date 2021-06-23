const express = require('express')

const app = express()
app.use(express.json());

const port = 3000
const isMutant = require('./isMutant.js');

app.get('/', (req, res) => {
    res.send('Mutant Inspector Server Running!')
})

app.post('/mutant', function(req, res) {
    var array = req.body.dna;
    var matriz = array.map(function(str) {
        return [...str];
    });
    return isMutant(matriz) ?
        res.sendStatus(200) :
        res.sendStatus(400)
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})