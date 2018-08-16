app.controller('IdeaManagementController', function ($controller, $scope) {

    angular.extend(
        this,
        $controller(
            'IdeaController',
            { $scope: $scope }
        ),
        $controller(
            'ManagementController',
            { $scope: $scope }
        )
    );
});