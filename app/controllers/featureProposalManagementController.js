app.controller('FeatureProposalManagementController', function ($controller, $scope) {

    angular.extend(
        this,
        $controller(
            'FeatureProposalController',
            { $scope: $scope }
        ),
        $controller(
            'ManagementController',
            { $scope: $scope }
        )
    );
});