'use strict';

/**
 * @ngdoc function
 * @name scoreCenterApp.controller:AboutCtrl
 * @description
 * # ScoresCtrl
 * Controller of the scoreCenterApp
 */


// Scores Controller 

app.controller('ScoresCtrl', ['$scope', '$rootScope', '$firebaseAuth', '$http', function ($scope, $rootScope, $firebaseAuth, $http) {
	var ref = new Firebase("https://scorecenter.firebaseio.com"); // Load up firebase 
	$scope.authObj = $firebaseAuth(ref);
	
	$scope.authObj.$onAuth(function(authData) {
	  if (authData) {
	  		console.log("Logged in as:", authData.uid);
	  		if($rootScope == undefined){

	  			$rootScope.user = authData.facebook;
	  			$rootScope.user.uid = authData.uid;
	  		}else {
	  			$rootScope.user = authData.facebook.cachedUserProfile;
	  			$rootScope.user.uid = authData.uid;
	  		}
	    
	  } else {
	    console.log("Logged out");
		}
	})
		$http.get("https://api.import.io/store/data/eee41621-e5c6-44b9-8c1a-55ccc224876d/_query?input/webpage/url=http%3A%2F%2Fwww.usatoday.com%2Fsports%2Fmlb%2Fscores%2F2015%2F09%2F08%2F&_user=2f5b2982-f003-4a4a-a4d8-cab5bdec8b41&_apikey=2f5b2982f0034a4aa4d8cab5bdec8b4106b2f25ec1e190c68a974af6416c4bed47be1f19b5c0d358eb3809c24629081a0402f2c5ca9c71576c267afca68e22f47448553daa33ab0f97363a3a065b2418")
    .success(function(response) {$scope.names = response.results;}); // pulling results from api 
}]);

// API pull from import.io

