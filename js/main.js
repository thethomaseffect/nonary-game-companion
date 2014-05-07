///<reference path="vendor/lodash.js"/>

var Nonary;
(function (Nonary) {

    function getDigitalRoot(number) {
        return 1 + (number - 1) % 9;
    }

    function getPossibleCombinations(target,numArray) {
        return arrayUnique(sortArrayOfCombos(_.union(
            all3NumberCombinations(target, numArray),
            all4NumberCombinations(target, numArray),
            all5NumberCombinations(target, numArray))));
    }

    function all3NumberCombinations(target,numbers) {
        var tempCombos = [];
        for (var a = 0; a <= numbers.length; a++) {
            for (var b = 0; b <= numbers.length; b++) {
                for (var c = 0; c <= numbers.length; c++) {
                    // Indexes are all different
                    if (_.unique([numbers[a], numbers[b], numbers[c]]).length === 3) {
                        if (getDigitalRoot(numbers[a] + numbers[b] + numbers[c]) === target) {
                            tempCombos.push([numbers[a], numbers[b], numbers[c]]);
                        }
                    }
                }
            }
        }
        return tempCombos;
    }

    function all4NumberCombinations(target, numbers) {
        var tempCombos = [];
        for (var a = 0; a <= numbers.length; a++) {
            for (var b = 0; b <= numbers.length; b++) {
                for (var c = 0; c <= numbers.length; c++) {
                    for (var d = 0; d <= numbers.length; d++) {
                        // Indexes are all different
                        if (_.unique([numbers[a], numbers[b], numbers[c], numbers[d]]).length === 4) {
                            if (getDigitalRoot(numbers[a] + numbers[b] + numbers[c] + numbers[d]) === target) {
                                tempCombos.push([numbers[a], numbers[b], numbers[c], numbers[d]]);
                            }
                        }
                    }
                }
            }
        }
        return tempCombos;
    }

    function all5NumberCombinations(target, numbers) {
        var tempCombos = [];
        for (var a = 0; a <= numbers.length; a++) {
            for (var b = 0; b <= numbers.length; b++) {
                for (var c = 0; c <= numbers.length; c++) {
                    for (var d = 0; d <= numbers.length; d++) {
                        for (var e = 0; e <= numbers.length; e++) {
                            // Indexes are all different
                            if (_.unique([numbers[a], numbers[b], numbers[c], numbers[d], numbers[e]]).length === 5) {
                                if (getDigitalRoot(numbers[a] + numbers[b] + numbers[c] + numbers[d] + numbers[e]) === target) {
                                    tempCombos.push([numbers[a], numbers[b], numbers[c], numbers[d], numbers[e]]);
                                }
                            }
                        }
                    }
                }
            }
        }
        return tempCombos;
    }

    function sortArrayOfCombos(arrayOfCombos) {
        _.each(arrayOfCombos,function(array) {
            array.sort();
        });
        return arrayOfCombos.sort();
    }

    function arrayUnique(array) {
        var a = array.concat();
        for (var outer = 0; outer < a.length; outer++) {
            for (var inner = outer + 1; inner < a.length; inner++) {
                if (_.difference(a[outer],a[inner]).length === 0) {
                    a.splice(inner--, 1);
                }
            }
        }

        return a;
    };

    function generateOutput() {
        var peoplePresent = [];
        for (var i = 1; i < 10; i++) {
            if ($("#c" + i).prop('checked')) {
                peoplePresent.push(i);
            }
        }
        
        $("#combos").html(
            _.template("<p>" +
            "<% _.forEach(results, function(combo) { %>" +
            "<li><%= combo %></li>" +
            "<% }); %>" +
            "</p>",
            { 'results': getPossibleCombinations(parseInt($("#doors").val(), 10), peoplePresent) }));
    }
    Nonary.generateOutput = generateOutput;

})(Nonary || (Nonary = {}));