'use strict';


// Declare app level module which depends on filters, and services
angular.module('hsfrWebInterface', [
  'ngRoute',
  'ngResource',
//  'ui.bootstrap.buttons',
  'troue.filters',
  'troue.services',
  'troue.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/guests', {templateUrl: 'js/admin/views/guests.html', controller: 'RecorderCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
