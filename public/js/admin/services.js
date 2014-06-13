'use strict';

/* Services */

angular.module('troue.services', ['ngResource'])
 
.factory('Guests', ['$resource', '$q', function($resource, $q) {
    var men = null;
    var women = null;
    
    var Guests = $resource('/guest-rest/:guestId', {}, {
        doSave: { method:'POST' },
        doUpdate: {
            method : 'PUT',
            params : {guestId:''}
        },
        doDelete: {
            method : 'DELETE',
            params : {guestId:''}
        },
        query: {
            method : 'GET',
            params : {guestId:''},
            transformResponse: function(data) {
                var i, all = angular.fromJson(data);
                women || (women = {});
                men || (men = {});
                for (i in all) {
                    if (all[i].gender == 'male') {
                        men[all[i].id] = all[i];
                    } else {
                        women[all[i].id] = all[i];
                    }
                }
                var couples = [],
                    pid;
                for (i in men) {
                    pid = men[i].partner;
                    men[i].partner = women[pid];
                    delete women[pid];
                    couples.push(men[i]);
                }
                for (i in women) {
                    couples.push(women[i]);
                }
                return {
                    couples : couples,
                    all : all
                };
            }
        }
    });
    
    function prepPartner(guest) {
        if (guest.partner && guest.partner.name) {
            var partner = guest.partner;
            partner.connection = guest.connection;
            partner.inviteMorning = guest.inviteMorning;
            partner.inviteEvening = guest.inviteEvening;
            partner.attendMorning = guest.attendMorning;
            partner.attendEvening = guest.attendEvening;
            partner.repliedAt = guest.repliedAt;
            return partner;
        }
    };
    
    Guests.save = function(guest) {
        var d = $q.defer();
        prepPartner(guest);
        Guests.doSave(guest, function(value) {
            d.resolve(value);
        });
        return d.promise;
    };
    
    Guests.update = function(guest) {
        var gd = $q.defer();
        Guests.doUpdate({guestId:guest.id}, guest, function(value) {
            gd.resolve(value);
        });
        
        var partner = prepPartner(guest);
        if (partner && partner.id) {
            var pd = $q.defer();
            Guests.doUpdate({guestId:partner.id}, partner, function(value) {
                pd.resolve(value);
            });
            return $q.all([gd.promise, pd.promise]);
        }
        
        return gd.promise;
    };
    
    Guests.delete = function(guest, partner) {
        var _partner = partner,
            gd = $q.defer(),
            pd = $q.defer();
        Guests.doDelete({guestId:guest.id}, function() {
            gd.resolve();
            if (_partner && _partner.id) {
                Guests.doDelete({guestId:_partner.id}, function() {
                    pd.resolve();
                });
            } else {
                pd.resolve();
            }
        });
        return $q.all(gd, pd);
    };
    
    Guests.refresh = function(guests) {
        var guests = guests;
        Guests.query(function(result) {
            angular.extend(guests, result);
        });
        return guests;
    };
    
    return Guests;
}]);
