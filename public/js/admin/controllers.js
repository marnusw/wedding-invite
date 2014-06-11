'use strict';

/* Controllers */

angular.module('troue.controllers', [])
  
.controller('GuestsController', ['$scope', 'Guests', 
function($scope, Guests) {
    $scope.guests = Guests.query();
    $scope.orderBy = 'name';
    $scope.editing = {};
    
    $scope.edit = function(guest) {
        $scope.editing[guest.id] = true;
    };
    $scope.cancel = function(guest) {
        delete $scope.editing[guest.id];
    };
    
    $scope.save = function(guest, $event) {
        if ($scope.editing[guest.id]) {
            delete $scope.editing[guest.id];
            Guests.update({guestId:guest.id}, guest);
        }
        
        if ($event.stopPropagation) $event.stopPropagation();
        if ($event.preventDefault) $event.preventDefault();
        $event.cancelBubble = true;
        $event.returnValue = false;
    };
    
    $scope.updatePartner = function(guest, partner) {
        console.log('New partner for', guest.name, '->', partner);
    };
}]);
