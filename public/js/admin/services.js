'use strict';

/* Services */

angular.module('troue.services', ['ngResource'])
 
.factory('Guests', ['$resource', function($resource) {
    var men = null;
    var women = null;
    
    return $resource('/guest-rest/:guestId', {}, {
        update: { method:'PUT' },
        query: {
            method  : 'GET',
            params  : {guestId:''},
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
}]);
