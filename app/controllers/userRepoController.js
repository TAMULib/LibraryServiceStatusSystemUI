app.controller('UserRepoController', function ($controller, $location, $injector, $scope, $route, StorageService, UserService) {
	
    angular.extend(this, $controller('AbstractController', {$scope: $scope}));
    
    $scope.user = UserService.getCurrentUser();

    if($scope.isAdmin()) {

    	var UserRepo = $injector.get("UserRepo");

    	$scope.userUpdated = {};

	    $scope.userRepo = UserRepo.getAll();

	    console.log($scope.userRepo)
	     
	    	
		$scope.updateRole = function(user) {
			
			angular.extend($scope.userUpdated, user);

			user.save();

			if($scope.user.uin == user.uin) {
				if(user.role == 'ROLE_ANNOTATOR') {
					$location.path('/assignments');
				}
				else if(user.role == 'ROLE_USER') {
					$location.path('/myview');
				}
				else {}
			}
		};
		
		$scope.allowableRoles = function(userRole) {
			if(StorageService.get('role') == 'ROLE_ADMIN') {
				return ['ROLE_ADMIN','ROLE_WEB_MANAGER', 'ROLE_SERVICE_MANAGER', 'ROLE_STAFF','ROLE_USER'];
			}
			else if(StorageService.get('role') == 'ROLE_WEB_MANAGER') {
				if(userRole == 'ROLE_ADMIN') {
					return ['ROLE_ADMIN'];
				}
				return ['ROLE_WEB_MANAGER', 'ROLE_SERVICE_MANAGER', 'ROLE_STAFF','ROLE_USER'];
			}
			else {
				return [userRole];
			}
		};
			

	    UserRepo.listen(function(response) {
	    	if($scope.userUpdated.uin == $scope.user.uin) {
	    		$scope.userUpdated = {};
				$route.reload();
			}
	    });

	}
    	
});


