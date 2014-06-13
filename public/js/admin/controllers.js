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
    $scope.cancel = function(guest, $event) {
        delete $scope.editing[guest.id];
        stop($event);
    };
    
    $scope.save = function(guest, $event) {
        if ($scope.editing[guest.id]) {
            delete $scope.editing[guest.id];
            Guests.update({guestId:guest.id}, guest);
            if (guest.partner) {
                var partner = guest.partner;
                partner.connection = guest.connection;
                partner.inviteMorning = guest.inviteMorning;
                partner.inviteEvening = guest.inviteEvening;
                partner.attendMorning = guest.attendMorning;
                partner.attendEvening = guest.attendEvening;
                partner.repliedAt = guest.repliedAt;
                Guests.update({guestId:partner.id}, partner);
            }
        }
        stop($event);
    };
    
    function stop($event) {
        if ($event.stopPropagation) $event.stopPropagation();
        if ($event.preventDefault) $event.preventDefault();
        $event.cancelBubble = true;
        $event.returnValue = false;
    }
    
    $scope.updatePartner = function(guest, partner) {
        console.log('New partner for', guest.name, '->', partner);
    };
}]);
