'use strict';

/* Services */

angular.module('troue.services', ['ngResource'])
 
.factory('Guests', ['$resource',
    function($resource) {
        var partners = null;
        
        var resource = $resource('/guest-rest/:guestId', {}, {
            query: {
                method  : 'GET',
                params  : {guestId:''},
                isArray : true,
                transformResponse: function(data) {
                    var i, array = angular.fromJson(data);
                    partners || (partners = {});
                    for (i in array) {
                        partners[array[i].id] = array[i];
                    }
                    return array;
                }
            }
        });
        
        resource.getPartner = function(id) {
            if (partners !== null) {
                return partners[id];
            } else {
                return resource.get(id);
            }
        };
        
        return resource;
    }
]);
