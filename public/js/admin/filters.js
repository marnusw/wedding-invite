'use strict';

/* Filters */

angular.module('troue.filters', [])

.filter('capsEachWord', function() {
    return function(text) {
        var w, words = text.split(' ');
        for (w in words) {
            words[w] = words[w].charAt(0).toUpperCase() + words[w].slice(1);
        }
        return words.join(' ');
    };
})

.filter('hexNum', function() {
    return function(num, digits, caps) {
        if (num !== 0 && !num) { return ''; }
        var hex = num.toString(16);
        if (digits !== undefined && hex.length < digits) {
            hex = (new Array(digits - hex.length + 1).join('0')) + hex;
        }
        return '0x' + (caps || caps === undefined ? hex.toUpperCase() : hex);
    };
})

.filter('fileSize', ['$filter', function($filter) {
    return function(size, fraction) {
        fraction === undefined && (fraction = 1);
        if (size > 1000000) {
            return $filter('number')(size / 1000000, fraction) + ' MB';
        } else if (size > 1000) {
            return $filter('number')(size / 1000, fraction) + ' KB';
        }
        return $filter('number')(size, fraction) + ' B';
    };
}])

.filter('progressSize', ['$filter', function($filter) {
    return function(progress, fraction) {
        fraction === undefined && (fraction = 1);
        if (progress.total > 1000000) {
            return $filter('number')(progress.done / 1000000, fraction) + '/' 
                 + $filter('number')(progress.total / 1000000, fraction) + ' MB';
        } else if (progress.total > 1000) {
            return $filter('number')(progress.done / 1000, fraction) + '/' 
                 + $filter('number')(progress.total / 1000, fraction) + ' KB';
        }
        return $filter('number')(progress.done, fraction) + '/' + $filter('number')(progress.total, fraction) + ' B';
    };
}]);
