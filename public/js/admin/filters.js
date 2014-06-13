'use strict';

/* Filters */

angular.module('troue.filters', [])

.filter('truncate', function() {
    return function(str, chars) {
        if (str && str.length > chars) {
            return '<span title="' + str + '">' + str.substr(0, chars) + '...' + '</span>';
        }
        return str;
    };
})

.filter('fullName', function() {
    return function(guest) {
        if (!guest) {
            return '';
        }
        var name = guest.name;
        if (guest.surname) {
            name += ' ' + guest.surname;
        }
        return name;
    };
})

.filter('attend', function() {
    return function(values) {
        var text;
        if (values[0] !== true && values[0] !== false) {
            return '';
        } else {
            text = values[0] === true ? '\u2713' : '\u2718';
        }
        if (values[1] === true) {
            text += ' | \u2713';
        } else if (values[0] === false) {
            text += ' | \u2718';
        }
        return text;
    };
})

.filter('checkmark', function() {
    return function(input) {
        if (input === null) {
            return '';
        }
        return input && input !== 'false' ? '\u2713' : '\u2718';
    };
})

.filter('gender', function() {
    return function(input) {
        return input === 'male' ? 'M' : 'F';
    };
});
