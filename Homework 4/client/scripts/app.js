angular
  .module('app', ['mainController', 'ngRoute'])
  .config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
  }])
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $routeProvider.when('/', {
      controller: 'MainController',
      templateUrl: 'views/main.html'
    }).otherwise({ redirectTo: '/' });
  }]);
