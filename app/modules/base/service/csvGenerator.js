


/**
 * csvGenerator
 * @constructor
 */
angular.module('base').factory('csvGenerator', ['$document', function ($document) {
    'use strict';
    var service = {
        compileArray: compileArray,
        compileObject: compileObject,
        compileCollection: compileCollection,
        saveFile: saveFile,

    };

    /**
     * compile string of array
     * @param array
     * @returns {string}
     */
    function compileArray(array) {
        var finalVal = '';
        for (var counter = 0; counter < array.length; counter++) {
            var innerValue = (array[counter] === null) ? '' : array[counter].toString();
            if (array[counter] instanceof Date) {
                innerValue = array[counter].toLocaleString();
            }
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0) {
                result = '"' + result + '"';
            }
            if (counter > 0) {
                finalVal += ',';
            }
            finalVal += result;
        }
        return finalVal + '\n';
    }

    /**
     * compile string of object by pattern
     * @param object
     * @param pattern
     * @returns {string}
     */
    function compileObject(object, pattern) {
        var values = [];
        angular.forEach(pattern, function(nameKey) {
            var value = eval('object.'+nameKey);
            if (angular.isUndefined(value)) {
                values.push('');
            }
            else {
                values.push(value);
            }
        });
        return compileArray(values);
    }

    /**
     * compile file of object or array by pattern
     * @param collection
     * @param compileCallback
     * @returns {string}
     */
    function compileCollection(collection, compileCallback) {
        var csvFile = '';
        for (var counter = 0; counter < collection.length; counter++) {
            if (angular.isFunction(compileCallback)) {
                csvFile += compileCallback(collection[counter]);
            }
            else {
                csvFile += compileArray(collection[counter]);
            }
        }
        return csvFile;
    }

    /**
     * save file
     * @param name
     * @param csvStrings
     */
    function saveFile(name, csvStrings) {
        var blob = new Blob([csvStrings], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, name);
    }

    return service;
}]);