'use strict';

// Declare app level module which depends on filters, and services
angular.module('troue', [
  'ngRoute',
  'ngResource',
  'ngSanitize',
  'ui.bootstrap.position',
  'ui.bootstrap.datepicker',
  'troue.filters',
  'troue.services',
  'troue.directives',
  'troue.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/guests', {templateUrl: '/js/admin/views/guests.html', controller: 'GuestsController'});
  $routeProvider.when('/morning', {templateUrl: '/js/admin/views/morning.html', controller: 'MorningController'});
  $routeProvider.when('/evening', {templateUrl: '/js/admin/views/evening.html', controller: 'EveningController'});
  $routeProvider.otherwise({redirectTo: '/guests'});
}]);
