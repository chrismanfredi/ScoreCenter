

app.controller('SingleGameCtrl', ['$scope', '$firebaseArray', '$firebaseObject', '$rootScope', '$firebaseAuth', function ($scope ,$firebaseArray, $firebaseObject, $rootScope, $firebaseAuth ) {
  	var gameid = 6327;
  	var refInfo = new Firebase("https://scorecenter.firebaseio.com" + '/' + gameid );
	$scope.singlegame = $firebaseObject(refInfo);

	var refComments = new Firebase("https://scorecenter.firebaseio.com" + '/' + gameid + '/comments' );
	$scope.comments = $firebaseArray(refComments);

	$scope.authObj = $firebaseAuth(refInfo);
	
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

	$scope.addComment = function(e) {
		// if (e.KeyCode !== 13) return;
		$scope.newComment.user = $rootScope.user.name;
		$scope.newComment.picture = $rootScope.user.picture.data.url;
		console.log('user', $scope.newComment);

		$scope.comments.$add($scope.newComment).then(function(ref) {
  			var id = ref.key();
  			console.log("added record with id " + id);
  			$scope.comments.$indexFor(id); // returns location in the array
		});
		$scope.newComment = "";
	};
}]);