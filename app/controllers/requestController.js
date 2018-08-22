app.controller('RequestController', function ($controller, $location, $routeParams, $scope, ServiceRepo, StorageService, UserService) {

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

        // needs to be an object for ng-disabled
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
            if ($routeParams.service) {
                $scope.service = $routeParams.service;
            }
            if (type) {
                $scope.type = type;
            } else {
                if ($routeParams.type) {
                    var pType = $routeParams.type.toUpperCase();
                    if (pType === 'FEATURE' || pType === 'ISSUE') {
                        $scope.type = pType;
                    } else {
                        if ($scope.service) {
                            $location.path('request/' + $scope.service);
                        } else {
                            $location.path('request');
                        }
                    }
                }
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
            if ($scope.request.sendUpdates) {
                request.email = $scope.email;
            }
            ServiceRepo.submitRequest(request).then(function () {
                clear();
            });
        };

        clear();
    }

});