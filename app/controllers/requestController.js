app.controller('RequestController', function ($controller, $scope, ProjectService, StorageService) {

    angular.extend(this, $controller('AuthenticationController', {
        $scope: $scope
    }));

    if (StorageService.get('role') === 'ROLE_ANONYMOUS') {
        $scope.login();
    } else {

        $scope.reset = function () {
            $scope.request = {

            };
        };

        $scope.clear = function () {
            $scope.request = {
                type: $scope.request.type
            };
        };

        $scope.submit = function () {
            ProjectService.submitRequest($scope.request).then(function (message) {
                $scope.reset();
            });
        };

        $scope.reset();

        ProjectService.getAll().then(function (projects) {
            $scope.projects = projects;
            $scope.getProject = function (service) {
                if (service.projectId && !service.project) {
                    service.project = {};
                    ProjectService.getById(service.projectId).then(function (project) {
                        angular.extend(service, {
                            project: project
                        });
                    });
                    return service.project;
                }
                return service.project;
            };
        });
    }

});