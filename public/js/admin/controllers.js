'use strict';

/* Controllers */

angular.module('troue.controllers', [])
  
.controller('GuestsController', ['$scope', 'Guests', 
function($scope, Guests) {
    $scope.guests = Guests.query();
    $scope.orderBy = 'name';
    $scope.editing = {};
    $scope.newGuest = {};
    
    $scope.edit = function(guest) {
        $scope.editing[guest.id] = true;
    };
    $scope.cancel = function(guest, $event) {
        delete $scope.editing[guest.id];
        $event && stop($event);
    };
    $scope.save = function(guest, $event) {
        if ($scope.editing[guest.id]) {
            delete $scope.editing[guest.id];
            Guests.update(guest).then(function() {
                $scope.guests = Guests.refresh();
            });
        }
        $event && stop($event);
    };
    
    $scope.deleteBoth = function(guest, $event) {
        var yes = confirm('Are you sure you want to delete ' + guest.name + ' and his/her partner?');
        if (yes) {
            $scope.guests.all.splice($scope.guests.all.indexOf(guest), 1);
            $scope.guests.all.splice($scope.guests.all.indexOf(guest.partner), 1);
            $scope.guests.couples.splice($scope.guests.couples.indexOf(guest), 1);
            delete $scope.editing[guest.id];
            Guests.delete(guest, guest.partner);
        }
        stop($event);
    };
    $scope.deletePartner = function(guest, $event) {
        var yes = confirm('Are you sure you want to delete ' + guest.name + '\'s partner?');
        if (yes && guest.partner) {
            $scope.guests.all.splice($scope.guests.all.indexOf(guest.partner), 1);
            delete $scope.editing[guest.id];
            Guests.delete(guest.partner).then(function() {
                $scope.guests = Guests.refresh();
            });
        }
        stop($event);
    };
    
    function stop($event) {
        if ($event.stopPropagation) $event.stopPropagation();
        if ($event.preventDefault) $event.preventDefault();
        $event.cancelBubble = true;
        $event.returnValue = false;
    }
    
    $scope.saveNew = function(guest) {
        Guests.save(guest).then(function() {
            $scope.guests = Guests.refresh();
        });
        $scope.newGuest = {};
    };
    $scope.cancelNew = function() {
        $scope.newGuest = {};
    };
}])

.controller('MorningController', ['$scope', 'Guests', 
function($scope, Guests) {
    $scope.guests = Guests.query();
    $scope.orderBy = 'name';
    $scope.final = false;
    $scope.filterFinal = {
        inviteMorning : true
    };
    
    $scope.toggleFinal = function() {
        if ($scope.filterFinal.attendMorning) {
            delete $scope.filterFinal.attendMorning;
        } else {
            $scope.filterFinal.attendMorning = true;
        }
    };
}])

.controller('EveningController', ['$scope', 'Guests', 
function($scope, Guests) {
    $scope.guests = Guests.query();
    $scope.orderBy = 'name';
    $scope.final = false;
    $scope.filterFinal = {
        inviteEvening : true
    };
    
    $scope.toggleFinal = function() {
        if ($scope.filterFinal.attendEvening) {
            delete $scope.filterFinal.attendEvening;
        } else {
            $scope.filterFinal.attendEvening = true;
        }
    };
}]);
