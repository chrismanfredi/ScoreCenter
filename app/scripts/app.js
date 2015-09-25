'use strict';

/**
 * @ngdoc overview
 * @name scoreCenterApp
 * @description
 * # scoreCenterApp
 *
 * Main module of the application.
 */
var app = angular.module('scoreCenterApp',['ngRoute', 'firebase']);  // Making angular.module into variable app

// My Routes for my app 
app.config(function ($routeProvider) { 
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/scores', {
        templateUrl: 'views/scores.html',
        controller: 'ScoresCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/singlegame', {
        templateUrl: 'views/singlegame.html',
        controller: 'SingleGameCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
});

// Headers for http pull request 

app.config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      $httpProvider.defaults.withCredentials = true;
      delete $httpProvider.defaults.headers.common["X-Requested-With"];
      $httpProvider.defaults.headers.common['Accept'] = "application/json";
      $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
}]);