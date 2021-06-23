const express = require('express')
const app = express()
const port = 3000
const isMutant = require('./isMutant.js');

app.get('/', (req, res) => {
    res.send('Mutant Inspector Server Running!')
})

let mutant = [
    ['A', 'T', 'G', 'C', 'G', 'A'],
    ['C', 'A', 'G', 'T', 'G', 'C'],
    ['T', 'T', 'A', 'T', 'G', 'T'],
    ['A', 'G', 'A', 'A', 'G', 'C'],
    ['C', 'C', 'C', 'C', 'T', 'A'],
    ['T', 'C', 'A', 'C', 'T', 'G'],
];


isMutant(mutant);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})