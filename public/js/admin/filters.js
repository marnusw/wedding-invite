'use strict';

/* Filters */

angular.module('troue.filters', ['troue.services'])

.filter('fullName', function() {
    return function(guest) {
        var name = guest.name;
        if (guest.surname) {
            name += ' ' + guest.surname;
        }
        return name;
    };
})

.filter('partnerName', ['Guests', 'fullNameFilter', function(Guests, fullName) {
    return function(id) {
        if (!id) {
            return '';
        }
        var partner = Guests.getPartner(id);
        return partner ? fullName(partner) : '';
    };
}])

.filter('invitedTo', function() {
    return function(input) {
        if (input.morning && input.evening) {
            return 'Both';
        } else if (input.morning) {
            return 'Morning';
        } else {
            return 'Evening';
        }
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
