app.controller('UserRepoController', function ($controller, $location, $injector, $scope, $route, StorageService, UserService) {

    angular.extend(this, $controller('AppAbstractController', {
        $scope: $scope
    }));

    $scope.user = UserService.getCurrentUser();

    UserService.userReady().then(function () {
        if ($scope.hasManagementAccess()) {

            var UserRepo = $injector.get("UserRepo");

            $scope.userUpdated = {};

            $scope.users = UserRepo.getAll();

            $scope.updateRole = function (user) {

                angular.extend($scope.userUpdated, user);

                user.save();

                if ($scope.user.username == user.username) {
                    if (user.role == 'ROLE_USER') {
                        $location.path('/myview');
                    } else {}
                }
            };

            $scope.allowableRoles = function (userRole) {
                if (StorageService.get('role') == 'ROLE_ADMIN') {
                    return ['ROLE_ADMIN', 'ROLE_SERVICE_ADMIN', 'ROLE_SERVICE_MANAGER', 'ROLE_WEB_MANAGER', 'ROLE_NOTICE_MANAGER', 'ROLE_STAFF', 'ROLE_USER'];
                } else if (StorageService.get('role') == 'ROLE_SERVICE_MANAGER') {
                    if (userRole == 'ROLE_ADMIN') {
                        return ['ROLE_ADMIN'];
                    }
                    return ['ROLE_SERVICE_MANAGER', 'ROLE_WEB_MANAGER', 'ROLE_NOTICE_MANAGER', 'ROLE_STAFF', 'ROLE_USER'];
                } else {
                    return [userRole];
                }
            };


            UserRepo.listen(function () {
                if ($scope.userUpdated.username == $scope.user.username) {
                    $scope.userUpdated = {};
                    $route.reload();
                }
            });

        }

    });


});