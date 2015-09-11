'use strict';

/**
 * @ngdoc function
 * @name scoreCenterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the scoreCenterApp
 */

var app = angular.module('scoreCenterApp');

app.controller('LoginCtrl', ['$scope', '$rootScope', '$location', '$firebaseAuth', function ($scope, $rootScope, $location, $firebaseAuth ) {
	var ref = new Firebase("https://scorecenter.firebaseio.com");
    $scope.authObj = $firebaseAuth(ref);

    $scope.fblogin = function(){
		$scope.authObj.$authWithOAuthPopup("facebook").then(function(authData) {
		  console.log("Logged in as:", authData);
		  $rootScope.user = authData.facebook;
		  $location.path('/scores');
		}).catch(function(error) {
		  console.error("Authentication failed:", error);
		});
    };

    $scope.twitterlogin = function(){
		$scope.authObj.$authWithOAuthPopup("twitter").then(function(authData) {
		  console.log("Logged in as:", authData);
		  $rootScope.user = authData.twitter;
		  $location.path('/scores');
		}).catch(function(error) {
		  console.error("Authentication failed:", error);
		});
    };
}]);

