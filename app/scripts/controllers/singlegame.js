'use strict';

app.controller('SingleGameCtrl', ['$scope', '$firebaseArray', '$firebaseObject', '$rootScope', '$firebaseAuth', function ($scope ,$firebaseArray, $firebaseObject, $rootScope, $firebaseAuth ) {
  	var gameid = 6327; // Variable with Game ID
  	var refInfo = new Firebase("https://scorecenter.firebaseio.com" + '/' + gameid ); // Load up my firebase with game ID
	$scope.singlegame = $firebaseObject(refInfo);

	var refComments = new Firebase("https://scorecenter.firebaseio.com" + '/' + gameid + '/comments' );
	$scope.comments = $firebaseArray(refComments);

	$scope.authObj = $firebaseAuth(refInfo);
	
	$scope.authObj.$onAuth(function(authData) {
	  if (authData) {
	  		console.log("Logged in as:", authData.uid); // Display User ID in console
	  		if($rootScope === undefined){

	  			$rootScope.user = authData.facebook;
	  			$rootScope.user.uid = authData.uid;
	  		}else {
	  			$rootScope.user = authData.facebook.cachedUserProfile;
	  			$rootScope.user.uid = authData.uid;
	  		}
	    
	  } else {
	    console.log("Logged out"); // Display user logged out in console 
		}
	});

	$scope.addComment = function(e) {
		// if (e.KeyCode !== 13) return;
		$scope.newComment.user = $rootScope.user.name; // Facebook User Name
		$scope.newComment.picture = $rootScope.user.picture.data.url; // Facebook Profile Pic
		console.log('user', $scope.newComment); // Display Comment

		$scope.comments.$add($scope.newComment).then(function(ref) {
  			var id = ref.key();
  			console.log("added record with id " + id);
  			$scope.comments.$indexFor(id); // returns location in the array
		});
		$scope.newComment = "";
	};
}]);