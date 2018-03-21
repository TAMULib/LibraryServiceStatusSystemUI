app.controller('RequestController', function ($controller, $scope, ProjectService, StorageService) {

    angular.extend(this, $controller('AuthenticationController', {
        $scope: $scope
    }));

    if (StorageService.get('role') === 'ROLE_ANONYMOUS') {
        $scope.login();
    } else {

        $scope.requestForm = undefined;

        var clear = function(type) {
            delete $scope.type;
            delete $scope.title;
            delete $scope.description;
            delete $scope.project;
            if($scope.requestForm) {
                $scope.requestForm.$setPristine();
                $scope.requestForm.$setUntouched();
            }
            if(type) {
                $scope.type = type;
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
            if($scope.project) {
                request.project = $scope.project;
            }
            ProjectService.submitRequest(request).then(function (message) {
                clear();
            });
        };

        clear();

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