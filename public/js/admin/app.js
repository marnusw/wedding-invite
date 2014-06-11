'use strict';

// Declare app level module which depends on filters, and services
angular.module('troue', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap.position',
  'ui.bootstrap.datepicker',
  'troue.filters',
  'troue.services',
  'troue.directives',
  'troue.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/guests', {templateUrl: '/js/admin/views/guests.html', controller: 'GuestsController'});
  $routeProvider.otherwise({redirectTo: '/guests'});
}]);
