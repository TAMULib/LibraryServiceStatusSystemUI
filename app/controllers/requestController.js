app.controller('RequestController', function ($controller, $routeParams, $scope, ServiceRepo, StorageService, UserService) {

    angular.extend(this, $controller('AuthenticationController', {
        $scope: $scope
    }));

    if (StorageService.get('role') === 'ROLE_ANONYMOUS') {
        $scope.login();
    } else {
        UserService.userReady().then(function () {
            $scope.email = UserService.getCurrentUser().allCredentials.email;
        });

        $scope.requestForm = undefined;

        //Needs to be an object for ng-disabled
        $scope.request = {};

        $scope.services = ServiceRepo.getAll();

        var clear = function (type) {
            delete $scope.type;
            delete $scope.title;
            delete $scope.description;
            delete $scope.service;
            $scope.request.sendUpdates = true;
            if ($scope.requestForm) {
                $scope.requestForm.$setPristine();
                $scope.requestForm.$setUntouched();
            }
            if (type) {
                $scope.type = type;
            }
            if ($routeParams.service) {
                $scope.service = $routeParams.service;
            }
        };

        $scope.reset = function () {
            clear();
        };

        $scope.clear = function () {
            clear($scope.type);
        };

        $scope.submit = function () {
            var request = {
                type: $scope.type,
                title: $scope.title,
                description: $scope.description
            };
            if ($scope.service) {
                request.service = $scope.service;
            }
            if ($scope.sendUpdates) {
                request.email = $scope.email;
            }
            ServiceRepo.submitRequest(request).then(function (message) {
                clear();
            });
        };

        clear();
    }

});