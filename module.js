/*
    Function to determine horizontal patterns. This function only count strings with contiguos X letters
*/
var searchHorizontal = function(dna, contiguosLettersCount) {
    var patterns = Array();
    for (let i = 0; i < dna.length; i++) {
        var row = dna[i].join('');
        var result = row.match(/([a-zA-Z])\1*/g) || [];
        var pattern = result.find(x => x.length == contiguosLettersCount);
        if (pattern != null) {
            patterns.push(pattern);
        }
    }
    return patterns;
}

/*
    Function to determine vertical patterns. This function only count strings with contiguos X letters
*/
var searchVertical = function(dna, contiguosLettersCount) {
    var patterns = Array();
    for (let i = 0; i < dna.length; i++) {
        var columnArray = Array();
        for (let j = 0; j < dna[i].length; j++) {
            columnArray.push(dna[j][i]);
        }
        var column = columnArray.join('');
        var result = column.match(/([a-zA-Z])\1*/g) || [];
        var pattern = result.find(x => x.length == contiguosLettersCount);
        if (pattern != null) {
            patterns.push(pattern);
        }
    }
    return patterns;
}

/*
    Function to determine diagonal patterns top - bottom and bottom - top. This function only count strings with contiguos X letters
*/
var searchDiagonal = function(dna, bottomToTop, contiguosLettersCount) {
    var patterns = Array();
    var yLength = dna.length;
    var xLength = dna[0].length;
    var maxLength = Math.max(xLength, yLength);
    var temp;
    for (var k = 0; k <= 2 * (maxLength - 1); ++k) {
        temp = [];
        for (var y = yLength - 1; y >= 0; --y) {
            var x = k - (bottomToTop ? yLength - y : y);
            if (x >= 0 && x < xLength) {
                temp.push(dna[y][x]);
            }
        }
        if (temp.length > 0) {
            var diagonal = temp.join('');
            var result = diagonal.match(/([a-zA-Z])\1*/g) || [];
            var pattern = result.find(x => x.length == contiguosLettersCount);
            if (pattern != null) {
                patterns.push(pattern);
            }
        }
    }
    return patterns;
}

module.exports = {
    validateInput: function(input) {
        if (!(input instanceof Array)) {
            throw "input is not array";
        }

        var inputLength = input.length;
        for (let i = 0; i < input.length; i++) {
            var element = input[i];
            if (element.length != inputLength) {
                throw `element at position ${i} has not the required size. Each entry should be of size ${inputLength}`;
            }
            if (!/^[ATCG]+$/.test(element)) {
                throw `element at position ${i} has letters not allowed. You can set strings only with these letters ATCG`;
            }
        }
        return input;
    },
    isMutant: function(dna) {
        let contiguosLettersCount = 4;
        var horizontalPatterns = searchHorizontal(dna, contiguosLettersCount);
        var verticalPatterns = searchVertical(dna, contiguosLettersCount);
        var diagonalTopBottomPatterns = searchDiagonal(dna, false, contiguosLettersCount);
        var diagonalBottomTopPatterns = searchDiagonal(dna, true, contiguosLettersCount);
        return horizontalPatterns
            .concat(verticalPatterns)
            .concat(diagonalTopBottomPatterns)
            .concat(diagonalBottomTopPatterns).length > 1;
    }
};