let notMutant = [
    ['A', 'T', 'G', 'C', 'G', 'A'],
    ['C', 'A', 'G', 'T', 'G', 'C'],
    ['T', 'T', 'A', 'T', 'T', 'T'],
    ['A', 'G', 'A', 'C', 'G', 'C'],
    ['G', 'C', 'G', 'T', 'C', 'A'],
    ['T', 'C', 'A', 'C', 'T', 'G']
];




var searchHorizontal = function(dna) {
    var patterns = Array();
    for (let i = 0; i < dna.length; i++) {
        var row = dna[i].join('');
        var result = row.match(/([a-zA-Z])\1*/g) || [];
        var pattern = result.find(x => x.length == 4);
        if (pattern != null) {
            patterns.push({
                row: i,
                pattern: pattern
            });
        }
    }
    return patterns;
}

var searchVertical = function(dna) {
    var patterns = Array();
    for (let i = 0; i < dna.length; i++) {
        var columnArray = Array();
        for (let j = 0; j < dna[i].length; j++) {
            columnArray.push(dna[j][i]);
        }
        var column = columnArray.join('');
        var result = column.match(/([a-zA-Z])\1*/g) || [];
        var pattern = result.find(x => x.length == 4);
        if (pattern != null) {
            patterns.push({
                column: i,
                pattern: pattern
            });
        }
    }
    return patterns;
}

module.exports = function(dna) {
    var isMutant = false;
    var horizontalPatterns = searchHorizontal(dna);
    var verticalPatterns = searchVertical(dna);
    console.log("Horizontal Patterns: " + JSON.stringify(horizontalPatterns));
    console.log("Vertical Patterns: " + JSON.stringify(verticalPatterns));
};